import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { BiUpvote } from "react-icons/bi";
import AddProjectForm from "../../components/AddProject/AddProjectForm";
import EditProjectForm from "../../components/EditProjectForm/EditProjectForm";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import UpvoteButton from "../../components/UpvoteButton/UpvoteButton";
import { jwtDecode } from "jwt-decode";
function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [addProject, setAddProject] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const fetchData = useCallback(async () => {
    try {
      setIsLoggedIn(0);
      const response = await axios.get(`/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data);
      setProjects(response.data.projects);
      const token = localStorage.getItem("token");
      if (!token) {
        return setIsLoggedIn(0);
      }
      try {
        const decoded = jwtDecode(token);
        if (decoded.userId !== id) {
          return setIsLoggedIn(0);
        }
        return setIsLoggedIn(1);
        // history(`/${decoded.userId}`);
      } catch (error) {
        console.error("Failed to decode token:", error);
        return setIsLoggedIn(1);
      }
    } catch (error) {
      console.error("Error fetching events :(");
    }
  }, [id]);

  const handleDelete = async (projectId) => {
    const response = await fetch(
      `https://craftconnect-production.up.railway.app/api/project/${id}/${projectId}`,
      {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    if (data.message == "You are not authorized to delete this project") {
      return null;
    }
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );

    // if (response.ok) {
    //   // onDelete(project._id);
    // } else {
    //   alert(data.message);
    // }
  };

  const handleEdit = (project) => {
    if (editingProject != project) {
      return setEditingProject(project);
    }
    if (editingProject) {
      setEditingProject(null);
    } else {
      setEditingProject(project);
    }
  };

  const handleUpdate = (updatedProject) => {
    setProjects(
      projects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
    setEditingProject(null);
  };
  const handleAdd = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="pt-24">
      <div className="flex flex-col">
        {user && (
          <EditUserForm currentUser={user?.user} isLoggedIn={isLoggedIn} />
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-16">
          <h1>Projects</h1>
          {isLoggedIn ? (
            <button
              className="border-2"
              onClick={() => setAddProject(!addProject)}
            >
              Add Project
            </button>
          ) : (
            ""
          )}
        </div>
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col">
            <p>{project.title}</p>
            <Link to={`/project/${project._id}`}>
              <span className="bg-amber-400">Link</span>
            </Link>
            <p>{project.description}</p>
            <p>{project.link}</p>
            <div className="flex">
              <UpvoteButton
                projectId={project._id}
                currentUpvotes={project.upvotes}
                setUpvotes={(upvotes, projectId) => {
                  setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                      project._id === projectId
                        ? { ...project, upvotes: upvotes }
                        : project
                    )
                  );
                }}
              />
            </div>
            {isLoggedIn ? (
              <>
                <button
                  className="bg-blue-500"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete Project
                </button>
                <button
                  className="bg-red-500"
                  onClick={() => {
                    handleEdit(project);
                  }}
                >
                  Edit Project
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        addProject ? (
          <AddProjectForm userId={user?.user._id} onAdd={handleAdd} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {isLoggedIn
        ? projects.map((project) => (
            <div key={project._id}>
              {editingProject && editingProject._id === project._id && (
                <EditProjectForm
                  id={id}
                  project={project}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          ))
        : ""}
    </div>
  );
}

export default Profile;

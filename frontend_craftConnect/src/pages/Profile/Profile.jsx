import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { BiUpvote } from "react-icons/bi";
import AddProjectForm from "../../components/AddProject/AddProjectForm";
import EditProjectForm from "../../components/EditProjectForm/EditProjectForm";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching events :(");
    }
  }, [id]);

  const handleDelete = async (projectId) => {
    const response = await fetch(
      `https://craftconnect-c5w4.onrender.com/api/project/${id}/${projectId}`,
      {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    // if (response.ok) {
    //   // onDelete(project._id);
    // } else {
    //   alert(data.message);
    // }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleUpdate = () => {
    // setProjects(
    //   user?.projects.map((project) =>
    //     project._id === updatedProject._id ? updatedProject : project
    //   )
    // );
    setEditingProject(null);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="pt-24">
      <div className="flex flex-col">
        <EditUserForm currentUser={user?.user} />
        <h1>{user?.user.username}</h1>
        <p>{user?.user.role}</p>
        <p>{user?.user.bio}</p>
        <p>{user?.user.email}</p>
        <p>{user?.totalUpvotes}</p>
      </div>
      <div className="flex flex-col">
        <h1>Projects</h1>
        {user?.projects.map((project, index) => (
          <div key={index} className="flex flex-col">
            <p>{project.title}</p>
            <Link to={`/project/${project._id}`}>
              <span className="bg-amber-400">Link</span>
            </Link>
            <p>{project.description}</p>
            <p>{project.link}</p>
            <div className="flex">
              <BiUpvote className="w-5 h-5" />
              <span>{project.upvotes}</span>
            </div>
            <button
              className="bg-blue-500"
              onClick={() => handleDelete(project._id)}
            >
              Delete Project
            </button>
            <button className="bg-red-500" onClick={() => handleEdit(project)}>
              Edit Project
            </button>
          </div>
        ))}
      </div>
      {user && <AddProjectForm userId={user?.user._id} />}
      <div className="bg-red-200">
        {user?.projects.map((project) => (
          <div key={project._id}>
            {editingProject && editingProject._id === project._id && (
              <EditProjectForm
                id={id}
                project={project}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

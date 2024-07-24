// pages/ProjectDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpvoteButton from "../UpvoteButton/UpvoteButton";
import CommentForm from "../CommentForm/CommentForm";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const response = await fetch(
        `https://craftconnect-c5w4.onrender.com/api/project/${projectId}`,
        {
          credentials: "include", // Include cookies for authentication
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setProject(data.project);
        setComments(data.comments);
        setUser(data.user);
      } else {
        alert(data.message);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }
  const handleCommentAdded = (comment) => {
    // Add the new comment to the state
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <div className="pt-24">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>
        {/* <a href="" target="_blank" rel="noopener noreferrer"> */}
        Project Link - {project.link}
        {/* </a> */}
      </p>
      <h2>Created by: {user.username}</h2>
      <p>Role: {user.role}</p>
      <p>Bio: {user.bio}</p>
      <UpvoteButton
        projectId={project._id}
        currentUpvotes={project.upvotes}
        setUpvotes={(upvotes) => setProject({ ...project, upvotes })}
      />
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.user.username}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      <CommentForm projectId={project._id} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default ProjectDetailsPage;

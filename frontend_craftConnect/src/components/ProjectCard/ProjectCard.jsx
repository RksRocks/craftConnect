
import { Link } from "react-router-dom";
import UpvoteButton from "../UpvoteButton/UpvoteButton";

const ProjectCard = ({ project, upVote }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <Link to={`/project/${project._id}`}>
        <span className="bg-amber-400">Link</span>
      </Link>
      <p>{project.description}</p>
      <p>{project.link}</p>
      <div className="flex">
        {/* <BiUpvote className="w-5 h-5" />
        <span>{project.upvotes}</span> */}
        <UpvoteButton
          projectId={project._id}
          currentUpvotes={project.upvotes}
          setUpvotes={(upvotes, projectId) => {
            upVote(upvotes, projectId);
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;

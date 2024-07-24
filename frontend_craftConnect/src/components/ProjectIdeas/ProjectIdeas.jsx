import { FaRegHeart } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
function ProjectIdeas() {
  return (
    <div className="project-idea-1 bg-gray-200 rounded-md flex items-center gap-5 p-3 w-full">
      <div className="project-number w-[15%] flex justify-center items-center font-semibold">
        1
      </div>
      <div className="project-detail">
        <h3 className="font-semibold">Project Name</h3>
        <p className="project-short-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <IoIosLink className="w-5 h-5" />
        <FaRegHeart className="w-5 h-5" />
      </div>
    </div>
  );
}

export default ProjectIdeas;

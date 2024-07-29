import { FaRegHeart } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
function ProjectIdeas() {
  return (
    <div className="project-idea-1 bg-gray-200 rounded-md flex flex-col lg:flex-row items-center gap-5 p-3 w-full">
      <div className="project-detail w-full">
        <h3 className="font-semibold text-center md:text-start">
          Project Name
        </h3>
        <p className="project-short-description text-center md:text-start  overscroll-x-none h-[30%] w">
          Lorem ipsum dolor sit amet co nsectur adipisicing elit...
        </p>
      </div>
      <div className="flex flex-row lg:flex-col gap-2 justify-center items-center">
        <IoIosLink className="w-5 h-5" />
        <FaRegHeart className="w-5 h-5" />
      </div>
    </div>
  );
}

export default ProjectIdeas;

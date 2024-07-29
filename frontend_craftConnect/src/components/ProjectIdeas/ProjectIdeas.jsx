import { FaRegHeart } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
function ProjectIdeas({ name, desc, link }) {
  return (
    <div className="project-idea-1 bg-green-50 shadow-md rounded-md flex flex-col lg:flex-row items-center gap-5 p-3 w-full">
      <div className="project-detail w-full">
        <h3 className="font-semibold text-center text-lg md:text-start text-[#183632]">
          {name}
        </h3>
        <p className="project-short-description text-center md:text-start  overscroll-x-none h-[30%] w">
          {desc}
        </p>
      </div>
      <div className="flex flex-row lg:flex-col gap-2 justify-center items-center">
        <Link to={link} target="_blank">
          <IoIosLink className="w-5 h-5" />
        </Link>
        {/* <FaRegHeart className="w-5 h-5" /> */}
      </div>
    </div>
  );
}

export default ProjectIdeas;

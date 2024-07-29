import { Link } from "react-router-dom";
import UpvoteButton from "../../components/UpvoteButton/UpvoteButton";
import { FaLink } from "react-icons/fa6";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { VscCommentUnresolved } from "react-icons/vsc";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FaLinkSlash } from "react-icons/fa6";
function Projects({
  projects,
  isLoggedIn,
  handleDelete,
  handleEdit,
  setProjects,
}) {
  const history = useNavigate();
  return (
    <div className="flex flex-wrap justify-center px-3 md:px-5 items-center my-16 gap-y-16 gap-x-20">
      {projects.map((project) => (
        <div
          key={project._id}
          className="flex flex-col h-[480px] w-full lg:w-[28%] rounded-lg overflow-hidden shadow-lg bg-green-100"
        >
          <div className="relative slide-container   project_imgs !h-[45%] overflow-hidden">
            <Fade arrows={false} pauseOnHover={false} duration={3000}>
              {project?.images.map((img, index) => (
                <img
                  key={index}
                  loading="lazy"
                  src={img.url}
                  alt={img.public_id}
                  className="w-full h-[100%] !object-contain"
                />
              ))}
            </Fade>
          </div>
          <div className="bg-[#F2F0EF] h-[55%] p-5 text-[#388277] flex flex-col justify-between">
            <div className="link flex items-center justify-between mb-3">
              <Link
                to={`/project/${project._id}`}
                className="flex justify-between w-full items-center"
              >
                <h1 className="font-bold text-xl hover:underline">
                  {project.title}
                </h1>
              </Link>
              <div className="flex items-center gap-x-3">
                {isLoggedIn ? (
                  <>
                    <button
                      className="z-10 w-full py-2"
                      onClick={() => handleDelete(project._id)}
                    >
                      <AiOutlineDelete className="w-5 h-5 text-red-600" />
                    </button>
                    <button
                      className="z-10 w-full py-2"
                      onClick={() => handleEdit(project)}
                    >
                      <MdOutlineModeEdit className="w-5 h-5 text-blue-600 font-bold" />
                    </button>
                  </>
                ) : (
                  ""
                )}

                {project.link.length > 0 ? (
                  <Link to={project.link}>
                    <FaLink
                      className={`${isLoggedIn ? "w-5 h-5" : "w-5 h-5"}`}
                    />
                  </Link>
                ) : (
                  <Link>
                    <FaLinkSlash
                      className={`${isLoggedIn ? "w-5 h-5" : "w-5 h-5"}`}
                    />
                  </Link>
                )}
              </div>
            </div>

            <p className="font-medium text-base  scroll-auto h-[41%] overflow-y-scroll w-full bar project-desc ">
              {project.description}
            </p>
            {/* <p>{project.link}</p> */}

            <div className="flex w-full justify-between mt-3 items-center gap-x-4">
              <button
                onClick={() => {
                  history(`/project/${project._id}`);
                }}
                className="bg-[#388277]  text-white font-semibold  z-10 py-1 rounded-md w-[40%]"
              >
                Read More
              </button>
              <div className="flex gap-4 items-center">
                <UpvoteButton
                  projectId={project._id}
                  currentUpvotes={project.upvotes}
                  setUpvotes={(upvotes) => {
                    setProjects((prevProjects) =>
                      prevProjects.map((proj) =>
                        proj._id === project._id
                          ? { ...proj, upvotes: upvotes }
                          : proj
                      )
                    );
                  }}
                />
                <Link to={`/project/${project._id}`}>
                  <VscCommentUnresolved className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;

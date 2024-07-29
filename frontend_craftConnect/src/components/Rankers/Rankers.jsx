// import { FaRegComment } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { BiUpvote } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
function Rankers({ ranker, rank }) {
  return (
    <div
      className={`top-ranker-1 bg-gray-100 rounded-md flex flex-col  lg:flex-row items-center justify-center gap-5 p-5 ${
        rank === 1 && "first"
      } ${rank === 2 && "second"} ${rank === 3 && "third"}`}
    >
      <div className="w-[20%] lg:w-[7%] flex justify-center items-center">
        <img
          src={rank === 1 ? first : rank === 2 ? second : third}
          alt=""
          className={`${rank !== 1 && rank !== 2 && rank !== 3 && "hidden"} ${
            rank === 1 ? "w-full" : rank === 2 ? "w-full" : "w-full"
          }`}
        />
        <div
          className={`ranking-number w-[100%] h-full bg-gray-300  justify-center items-center font-semibold text-lg ${
            rank === 1 || rank === 2 || rank === 3 ? "hidden" : "flex"
          }`}
        >
          #{rank}
        </div>
      </div>
      <div
        className={`top-performer-details w-full flex flex-col md:flex-row justify-center items-center md:justify-start md:items-center gap-5  ${
          rank === 3 ? "text-white" : ""
        }`}
      >
        <div className="top-performer-img w-[10.8rem]  flex justify-center items-center  overflow-hidden">
          <img
            src={ranker.user.profileImg}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="top-performer-bio pr-5 w-full flex flex-col text-center md:text-start">
          <div className="personal-details flex flex-col">
            <h3 className="font-bold text-xl">{ranker.user.username}</h3>
            <h3
              className={`font-semibold  text-sm ${
                rank === 3 ? "text-gray-100" : "text-gray-600"
              }`}
            >
              {ranker.user.role}
            </h3>
          </div>
          <div className="description-shorted font-medium mt-2">
            <p className="text-sm">{ranker.user.bio}</p>
          </div>
          <div className="reaction-iocon flex items-center justify-end gap-5 mt-2">
            {/* <FaRegHeart className="w-5 h-5" /> */}
            {/* <FaRegComment className="w-5 h-5" /> */}
            {/* <BiUpvote className="w-5 h-5" /> */}
            {/* <FaRegBookmark className=""/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankers;

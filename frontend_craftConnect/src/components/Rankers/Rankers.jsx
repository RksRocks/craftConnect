// import { FaRegComment } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { BiUpvote } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
function Rankers({ ranker, rank }) {
  return (
    <div className="top-ranker-1 bg-gray-200 rounded-md flex items-center gap-5 p-3 ">
      <div className="ranking-number w-[10%] h-full bg-gray-300 flex justify-center items-center font-semibold text-lg ">
        #{rank}
      </div>
      <div className="top-performer-details w-full flex gap-5">
        <div className="top-performer-img w-[10.8rem]  flex justify-center items-center   overflow-hidden">
          <img
            src={ranker.user.profileImg}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="top-performer-bio pr-5 w-full">
          <div className="personal-details flex flex-col">
            <h3 className="font-semibold text-2xl">{ranker.user.username}</h3>
            <h3 className="font-semibold text-gray-500 text-sm">
              {ranker.user.role}
            </h3>
          </div>
          <div className="description-shorted mt-2">
            <p className="text-sm">{ranker.user.bio}</p>
            <p className="text-sm">{ranker._id}</p>
          </div>
          <div className="reaction-iocon flex items-center justify-end gap-5 mt-2">
            {/* <FaRegHeart className="w-5 h-5" /> */}
            {/* <FaRegComment className="w-5 h-5" /> */}
            {/* <BiUpvote className="w-5 h-5" /> */}
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankers;

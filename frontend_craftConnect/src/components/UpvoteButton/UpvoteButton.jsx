import axios from "../../api/axios";
import { BiUpvote } from "react-icons/bi";
const UpvoteButton = ({ projectId, currentUpvotes, setUpvotes }) => {
  const handleUpvote = async () => {
    try {
      const response = await axios.put(
        `/project/${projectId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpvotes(response.data.upvotes, projectId);
    } catch (error) {
      console.error("Failed to upvote project:", error.response.data.message);
    }
  };

  return (
    <button onClick={handleUpvote} className="flex items-center">
      <BiUpvote className="w-5 h-5" /> {currentUpvotes}
    </button>
  );
};

export default UpvoteButton;

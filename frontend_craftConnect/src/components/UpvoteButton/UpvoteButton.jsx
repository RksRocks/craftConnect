import axios from "../../api/axios";

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
      setUpvotes(response.data.upvotes);
    } catch (error) {
      console.error("Failed to upvote project:", error.response.data.message);
    }
  };

  return <button onClick={handleUpvote}>Upvote {currentUpvotes}</button>;
};

export default UpvoteButton;

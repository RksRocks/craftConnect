import { useState } from "react";
import axios from "../../api/axios";
import { toast, Bounce } from "react-toastify";
const CommentForm = ({ projectId, onCommentAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/project/${projectId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onCommentAdded(
        response.data.comment,
        response.data.username,
        response.data.profileImg
      );
      setContent("");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Failed to add comment :(", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-end">
      <textarea
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button
        type="submit"
        className="bg-[#388277] hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;

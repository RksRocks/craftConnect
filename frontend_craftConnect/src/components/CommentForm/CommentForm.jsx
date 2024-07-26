import { useState } from "react";
import axios from "../../api/axios";

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
      onCommentAdded(response.data.comment, response.data.username);
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;

// components/AddProjectForm.jsx
import { useState } from "react";

const AddProjectForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://craftconnect-c5w4.onrender.com/api/project/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ userId, title, description, link }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Project added successfully");
      setTitle("");
      setDescription("");
      setLink("");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;

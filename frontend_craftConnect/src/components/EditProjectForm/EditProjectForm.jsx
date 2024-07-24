// components/EditProjectForm.jsx
import { useState } from "react";

const EditProjectForm = ({ id, project, onUpdate }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [link, setLink] = useState(project.link);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://craftconnect-c5w4.onrender.com/api/project/${id}/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ title, description, link }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      onUpdate(data.project);
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-green-400">
        Update Project
      </button>
    </form>
  );
};

export default EditProjectForm;

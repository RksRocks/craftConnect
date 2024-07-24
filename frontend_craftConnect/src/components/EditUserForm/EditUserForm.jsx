// components/EditUserForm/EditUserForm.jsx
import { useState } from "react";
import axios from "../../api/axios";

const EditUserForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    bio: currentUser?.bio,
    role: currentUser?.role,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/user/update",
        {
          formData,
          currentUser: currentUser?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
      // Optionally, you can update the current user details in your app state
    } catch (error) {
      console.error(
        "Error updating user details:",
        error.response.data.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-400">
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
      </div>
      <div>
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="role"
          value={formData.id}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUserForm;

// components/EditUserForm/EditUserForm.jsx
import { useState } from "react";
import axios from "../../api/axios";

const EditUserForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    role: "",
    id: "",
  });
  const [edit, setEdit] = useState(false);

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
      setEdit(0);
      // Optionally, you can update the current user details in your app state
    } catch (error) {
      console.error(
        "Error updating user details:",
        error.response.data.message
      );
    }
  };
  useEffect(() => {
    setFormData({
      username: currentUser.username || "",
      email: currentUser.email || "",
      bio: currentUser.bio || "",
      role: currentUser.role || "",
      id: currentUser._id || "",
      profileImg: currentUser.profileImg || "",
    });
  }, [currentUser]);
  const handleEditClick = () => {
    setEdit(!edit);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-400 flex flex-col items-center justify-center px-20 py-10"
    >
      <img src={formData.profileImg} alt="" className="w-24 h-24" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoggedIn ? (!edit ? true : false) : true}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoggedIn ? (!edit ? true : false) : true}
          />
        </div>
      </div>
      <div className="flex flex-col w-[100%]">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={isLoggedIn ? (!edit ? true : false) : true}
        />
      </div>
      <div className="flex flex-col w-full mb-8">
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={isLoggedIn ? (!edit ? true : false) : true}
        />
      </div>
      <div>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="hidden"
          disabled={isLoggedIn ? (!edit ? true : false) : true}
        />
      </div>
      {isLoggedIn ? (
        <div className="flex">
          <button
            className="z-10"
            onClick={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            Edit
          </button>
          {edit ? <button type="submit">Update</button> : ""}
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default EditUserForm;

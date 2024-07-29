// components/EditUserForm/EditUserForm.jsx
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
const EditUserForm = ({ currentUser, isLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    role: "",
    id: "",
  });
  const [originalData, setOriginalData] = useState({
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
    if (
      formData.username === originalData.username &&
      formData.bio === originalData.bio &&
      formData.role === originalData.role
    ) {
      setEdit(0);
      toast.success("User details updated successfully", {
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
      return;
    }
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

      toast.success(response.data.message, {
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
      setOriginalData(formData);
      setEdit(0);
      // Optionally, you can update the current user details in your app state
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
    setOriginalData({
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
      className=" flex flex-col items-center justify-center px-2 md:px-14 lg:px-20 py-10"
    >
      <div className="flex justify-between items-center w-full px-2 mb-5 md:px-8">
        <div></div>
        <img src={formData.profileImg} alt="" className="w-20 h-20" />
        <div>
          {isLoggedIn ? (
            <button
              className="z-10"
              onClick={(e) => {
                e.preventDefault();
                handleEditClick();
              }}
            >
              <FaRegEdit className="w-6 h-6" />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between mb-3 text-sm">
        <div className="flex flex-col w-full md:w-[48%] ">
          <label
            className="font-semibold text-gray-600 ml-1"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            className={`py-2 bg-gray-200 px-3 rounded-lg ${
              edit && "border-[3px] border-gray-500"
            }`}
            value={formData.username}
            onChange={handleChange}
            disabled={isLoggedIn ? (!edit ? true : false) : true}
          />
        </div>
        <div className="flex flex-col w-full md:w-[48%] mt-3 md:mt-0">
          <label className="font-semibold text-gray-600 ml-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`py-2 bg-gray-200 px-3 rounded-lg `}
            value={formData.email}
            onChange={handleChange}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex flex-col w-[100%] mb-3  text-sm">
        <label className="font-semibold text-gray-600 ml-1" htmlFor="role">
          Role:
        </label>
        <input
          type="text"
          name="role"
          className={`py-2 bg-gray-200 px-3 rounded-lg ${
            edit && "border-[3px] border-gray-500"
          }`}
          value={formData.role}
          onChange={handleChange}
          disabled={isLoggedIn ? (!edit ? true : false) : true}
        />
      </div>
      <div className="flex flex-col w-full mb-8  text-sm">
        <label className="font-semibold text-gray-600 ml-1" htmlFor="bio">
          Bio:
        </label>
        <textarea
          name="bio"
          className={`py-2 bg-gray-200 px-3 rounded-lg ${
            edit && "border-[3px] border-gray-500"
          }`}
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
        edit ? (
          <button
            type="submit"
            className="border-[2px]  text-white border-[#fff] py-1 px-6 rounded-lg font-semibold
            bg-[#388277] hover:border-[#fff] hover:bg-[#388277ef] transition-all duration-300 hover:shadow-2xl"
          >
            Update
          </button>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </form>
  );
};

export default EditUserForm;

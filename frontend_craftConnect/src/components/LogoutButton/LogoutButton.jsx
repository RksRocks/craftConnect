import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const LogoutButton = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token"); // Remove the token from localStorage
      history("/login"); // Redirect to login page
    } catch (error) {
      console.error("Failed to logout:", error.response.data.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton/LogoutButton";
import UserSearch from "../UserSearch/UserSearch";

function Navbar() {
  const history = useNavigate();
  const token = localStorage.getItem("token");
  const userProfile = () => {
    if (!token) {
      return history(`/login`);
    }

    try {
      const decoded = jwtDecode(token);
      history(`/${decoded.userId}`);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  return (
    <div className="fixed flex w-full justify-between items-center px-20 py-7 bg-black text-white">
      <div className="font-bold text-xl">
        <Link to={"/"}>CraftConnect.dev</Link>
      </div>
      <div className="w-1/2">
        <ul className="flex w-full justify-around font-medium">
          <Link to={"/"}>Home</Link>
          {/* <li>Dashboard</li> */}
          <Link to={"/most-upvoted"}>Most Liked</Link>
          {/* top rated */}
          <p onClick={userProfile} className="cursor-pointer">
            Profile
          </p>
          {!token ? (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          ) : (
            <LogoutButton />
          )}
          <UserSearch />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

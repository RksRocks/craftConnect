import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
import Footer from "./components/Footer/Footer";
import ProjectDetailsPage from "./components/ProjectDetailsPage/ProjectDetailsPage";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/Login/Login";
// import ProtectedPage from "./pages/Login/ProtectedPage";
import MostUpvoted from "./pages/MostUpVoted/MostUpVoted";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/most-upvoted" element={<MostUpvoted />} />
          <Route path="/:id" element={<Profile />} />
          <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
          {/* <Route path="/" element={<ProfileEditable />} /> */}
          {/* <Route path="/" element={<ProfileNonEditable />} /> */}
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

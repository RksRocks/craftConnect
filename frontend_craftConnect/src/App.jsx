import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProjectDetailsPage = lazy(() =>
  import("./components/ProjectDetailsPage/ProjectDetailsPage")
);
const RegisterPage = lazy(() => import("./pages/Register/Register"));
const MostUpvoted = lazy(() => import("./pages/MostUpVoted/MostUpVoted"));
const LoginPage = lazy(() => import("./pages/Login/Login"));
import Footer from "./components/Footer/Footer";
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

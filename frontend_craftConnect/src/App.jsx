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
import ProtectedPage from "./pages/Login/ProtectedPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/protected" element={<ProtectedPage />} />
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

import { Router } from "express";
// import * as projectController from "../controllers/project.js";
import {
  getProject,
  getTopRankedProjects,
  addProject,
  deleteProject,
  updateProject,
  upvoteProject,
  addComment,
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Router();

router.get("/top-ranked", getTopRankedProjects);
router.get("/:projectId", getProject);
router.post("/add", isAuthenticated, addProject);
router.put("/:projectId/upvote", isAuthenticated, upvoteProject);
router.delete("/:id/:projectId", isAuthenticated, deleteProject);
router.put("/:id/:projectId", isAuthenticated, updateProject);
router.post("/:projectId/comments", isAuthenticated, addComment);

export default router;

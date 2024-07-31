import { Router } from "express";
// import * as projectController from "../controllers/project.js";
import {
  getProject,
  getTopRankedProjects,
  addProject,
  deleteProject,
  updateProject,
  upvoteProject,
  getUpvoteStatus,
  addComment,
  mostUpVoted,
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../services/multer.js";
const router = Router();

router.get("/top-ranked", getTopRankedProjects);
router.get("/most-upvoted", mostUpVoted);
router.get("/:projectId", getProject);
router.post("/add", isAuthenticated, upload.array("images", 5), addProject);
router.put("/:projectId/upvote", isAuthenticated, upvoteProject);
router.get("/:projectId/upvote-status", getUpvoteStatus);
router.delete("/:id/:projectId", isAuthenticated, deleteProject);
router.put(
  "/:id/:projectId",
  isAuthenticated,
  upload.array("images", 5),
  updateProject
);
router.post("/:projectId/comments", isAuthenticated, addComment);

export default router;

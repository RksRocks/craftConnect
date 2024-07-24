import { Router } from "express";
import * as userController from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Router();

// router.post("/register", userController.register);
// router.post("/login", passport.authenticate("local"), userController.login);
router.get("/profile/:id", userController.getProfile);
router.put("/update", isAuthenticated, userController.updateProfile);

export default router;

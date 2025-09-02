import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("name").isString().withMessage("name is requried"),
  projectController.createProject
);

router.get('/all', authMiddleware.authUser, projectController.getAllProjects);

router.put('/add-user',
  authMiddleware.authUser,
  body("projectId").isString().withMessage("projectId is required"),
  body("users")
    .isArray({ min: 1 }).withMessage("users must be a non-empty array")
    .custom((arr) => arr.every(user => typeof user === "string")).withMessage("each user must be a string"),
  projectController.addUserToProject
)

export default router;

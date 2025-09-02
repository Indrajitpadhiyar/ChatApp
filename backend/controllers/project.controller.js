import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const LoggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = LoggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });
    return res.status(201).json({ project: newProject });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const LoggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const allUserProjects = await projectService.getAllProjectsUserId(
      LoggedInUser._id
    );
    return res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;
    const LoggedInUser = await userModel.findOne({ email: req.user.email });

    const project = await projectService.addUsersTOProject({
      projectId,
      users,
      userId: LoggedInUser._id,
    });
    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

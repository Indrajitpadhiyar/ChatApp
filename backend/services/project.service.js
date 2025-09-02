import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const project = await projectModel.create({
      name,
      users: [userId],
    });
    return project;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }
};

export const getAllProjectsUserId = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });
  return allUserProjects;
};

export const addUsersTOProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }
  if (!users || !Array.isArray(users) || users.length === 0) {
    throw new Error("Users are required and must be a non-empty array");
  }
  for (const uid of users) {
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      throw new Error(`Invalid User ID: ${uid}`);
    }
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }

  // Example logic to add users to the project
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });
  if (!project) {
    throw new Error("Project not found");
  }

  // Add only unique users
  const uniqueUsers = [
    ...new Set([
      ...project.users.map((u) => u.toString()),
      ...users.map((u) => u.toString()),
    ]),
  ];
  project.users = uniqueUsers;
  await project.save();

  return project;
};

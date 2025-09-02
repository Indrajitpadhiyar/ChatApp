import User from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Password hash karo
  const hashPassword = await User.hashPassword(password);

  // Naya user banao
  const user = await User.create({
    email,
    password: hashPassword,
  });

  console.log("User created:", user);
  return user;
};

export const getAllUsers = async ({ userId }) => {
  try {
    const users = await User.find({ _id: { $ne: userId } });
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

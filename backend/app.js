import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import projectRoutes from "./routes/project.route.js";

const app = express();

app.use(cors())
app.use(morgan("dev")); // server pe agar kisi bhi routs se reqeast ayegi toh wo sab aa jaega
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;

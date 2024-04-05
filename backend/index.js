import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./src/core/database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./src/routes/user.routes.js";
import fileRouter from "./src/routes/file.routes.js";

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(
//   cors({
//     origin: ["*"],
//     methods: ["*"],n
//     credentials: true,
//   })
// );

app.use(cors()); //above cors is not working

app.use("/api/user", userRouter);
app.use("/api/file", fileRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server statrted at 3000");
});

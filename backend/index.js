import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/catogery.routes.js";

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, "./.env") });

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: ["*"],
//     methods: ["*"],n  
//     credentials: true,
//   })
// );

app.use(cors());  //above cors is not working 

app.use("/api/user", userRouter);
app.use("/api/categories", categoryRouter);

app.listen(3001, () => {
  console.log("server statrted at 3000");
});

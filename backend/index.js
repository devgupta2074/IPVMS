import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./src/core/database/db.js";

import dotenv from "dotenv";
import path from "path";
import userRouter from "./src/routes/user.Routes.js";
import compression from "compression";
import fileRouter from "./src/routes/file.Routes.js";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { apiDocumentation } from "./docs/apidoc.js";

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const limiter = rateLimit({
  windowMs: 1 * 60 * 60,
  max: 10,
});

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: ["*"],
    methods: ["*"],
    credentials: true,
  })
);
app.use(compression());
app.use(limiter);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use("/api/user", userRouter);

app.use("/api/file", fileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server statrted at 3000");
});

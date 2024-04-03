import express from "express";
import { createNewCategory, getAllCategories } from "../controllers/catogery/catogery.controller.js";


const categoryRouter = express.Router();


categoryRouter.post("/createNewCategory", createNewCategory);
categoryRouter.get("/getAllCategories", getAllCategories);


export default categoryRouter;

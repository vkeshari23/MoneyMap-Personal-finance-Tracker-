import express from "express";
import { incomeController, getIncomes } from "../controllers/incomeController.js";
const router = express.Router();

router.post("/income",  incomeController);
router.get("/income",getIncomes);

export default router;

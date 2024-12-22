import express from 'express';
import { expensesController, getexpensesController } from '../controllers/expensesController.js';
const router = express.Router();

router.post("/expenses", expensesController);
router.get("/expenses", getexpensesController);

export default router;

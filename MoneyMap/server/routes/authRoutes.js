import express from 'express';
import { 
    registerationController,
    loginController
} from '../controllers/authController.js';
const router = express.Router();

//http://localhost:5050/api/v1/register
router.post("/register",registerationController)

//http://localhost:5050/api/v1/login
router.post("/login", loginController);

export default router;

























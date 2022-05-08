import { Router } from "express";
import { register, login, getCurrentUser, logout } from "../controllers/authController";
const router = Router();

router.get('/currentuser', getCurrentUser);
router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);

export {router as authRouter};
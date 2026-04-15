import { Router } from "express";
import { Login, SingUp, RefreshToken } from "../controllers/SessionControll.js";

const router = Router();

router.post("/auth/login", Login);
router.post("/auth/signup", SingUp);
router.post("/auth/refresh-token", RefreshToken);

export default router;
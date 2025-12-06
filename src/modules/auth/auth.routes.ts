import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/singup', authController.singUpNewUser);
router.post('/singin', authController.singinUser);


export const authRoutes = router;
import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/signup', authController.singUpNewUser);
router.post('/signin', authController.singinUser);


export const authRoutes = router;
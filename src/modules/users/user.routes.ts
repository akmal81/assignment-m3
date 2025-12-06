import {Router} from "express";
import { userController } from "./user.controller";


const router = Router();


router.get('/', userController.getAllUsers) //*admin only
router.put('/:userId', userController.updateUser) //*admin and user
router.delete('/:userId', userController.deleteUser)
export const userRoutes = router;
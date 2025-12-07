import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { Roles } from "../auth/auth.constant";
import auth from "../../middleware/auth";

const router = Router();


router.post('/', auth(Roles.admin), vehiclesController.addNewVehicle) //
router.get('/', vehiclesController.viewAllVehicles)
router.get('/:vehicleId', vehiclesController.viewSingleVehicle)
router.put('/:vehicleId', auth(Roles.admin), vehiclesController.updateVehicle)
router.delete('/:vehicleId', auth(Roles.admin), vehiclesController.deleteVehicle) 


export const vehiclesRoutes = router;
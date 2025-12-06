import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const router = Router();


router.post('/', vehiclesController.addNewVehicle) //!admin only
router.get('/', vehiclesController.viewAllVehicles) //!public
router.get('/:vehicleId', vehiclesController.viewSingleVehicle) //!Admin only
router.put('/:vehicleId', vehiclesController.updateVehicle) //!Admin only
router.delete('/:vehicleId', vehiclesController.deleteVehicle) //!Admin only


export const vehiclesRoutes = router;
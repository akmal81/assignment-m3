import { Router } from "express";
import { bookingsControllers } from "./bookings.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.post('/', auth(Roles.admin, Roles.customer), bookingsControllers.createBooking);
router.get('/', auth(Roles.admin, Roles.customer), bookingsControllers.getBookings);
router.put('/:bookingId',auth(Roles.admin, Roles.customer), bookingsControllers.updateBookings);

export const bookingsRoutes = router;
import { Router } from "express";
import { bookingsControllers } from "./bookings.controller";

const router = Router();

router.post('/', bookingsControllers.createBooking);
router.get('/', bookingsControllers.getBookings);
router.put('/:bookingId', bookingsControllers.updateBookings);

export const bookingsRoutes = router;
import { Request, Response } from "express"
import { bookingsService } from "./bookings.service"
import { pool } from "../../config/db"

const createBooking = async (req: Request, res: Response) => {

    try {
        const result = await bookingsService.createBooking(req.body)

        if (result === null) {

            return res.status(200).json(
                {
                    success: true,
                    message: "Vihecle already Booked",
                }
            )
        }

        if (result === false) {

            return res.status(400).json(
                {
                    success: true,
                    message: "End date must be grater than start date",
                }
            )
        }
        if (result === "invalidDate") {

            return res.status(400).json(
                {
                    success: true,
                    message: "Start date must be grater than to day",
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                message: "Booking created successfully",
                data:
                    result
            }
        )
    } catch (error: any) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

const getBookings = async (req: Request, res: Response) => {
    try {
        const id = req.user!.id;
        const role = req.user!.role;

        console.log(id)

        const result = await bookingsService.getBookings(role, id)

        if (result?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Booking data found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result
        })
    } catch (error: any) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}


const updateBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.updateBookings(req.user!.id as string, req.params.bookingId as string, req.body.status, req.user!.role as string);

        if (result === true) {
            return res.status(400).json({
                success: true,
                message: "You can cancel booking before start date only",
                error: "Cancellation date must be before start date"
            })
        }

        if (result === false) {
            return res.status(400).json({
                success: false,
                message: `Cutomer can mark "cancelled" only`,
                error: `User can not mark "returned" `,
            })
        }

        if (req.user!.role === 'customer') {

            return res.status(200).json({
                success: true,
                message: "Booking cancelled successfully",
                data: result!.rows[0]
            })
        }

        if (req.user!.role === 'admin') {

            return res.status(200).json({
                success: true,
                message: "Booking marked as returned. Vehicle is now available",
                data: result!.rows[0]
            })
        }

    } catch (error: any) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

export const bookingsControllers = {
    createBooking,
    getBookings,
    updateBookings
}
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

            return res.status(200).json(
                {
                    success: true,
                    message: "End date must be grater than start date",
                }
            )
        }
        if (result === "invalidDate") {

            return res.status(200).json(
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
        return res.status(400).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

const getBookings = async (req: Request, res: Response) => {
    try {

        const result = await bookingsService.getBookings()

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No data found"
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
        const result = await bookingsService.updateBookings(req.params.bookingId as string);
        return res.status(200).json({
            success:false,
            message:" ",
            data: result
        })
    } catch (error) {
        
    }
}

export const bookingsControllers = {
    createBooking,
    getBookings,
    updateBookings
}
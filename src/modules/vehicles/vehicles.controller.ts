import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";


const addNewVehicle = async (req: Request, res: Response) => {

    try {
        if (req.body.daily_rent_price < 0) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Daily rent price must be positive number",

                }
            )
        }

        const result = await vehiclesService.addNewVehicle(req.body)

        return res.status(201).json(
            {
                success: true,
                message: "Vehicle created successfully",
                data: result.rows[0]
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

const viewAllVehicles = async (req: Request, res: Response) => {
    try {

        const result = await vehiclesService.viewAllVehicles()
        if (result.rows.length === 0) {
            return res.status(200).json(
                {
                    success: true,
                    message: "No Vehicles found",
                    data: result.rows
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Vehicles retrieved successfully",
                data: result.rows
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
const viewSingleVehicle = async (req: Request, res: Response) => {

    try {
        const id = req.params.vehicleId as string

        const result = await vehiclesService.viewSingleVehicles(id)

        if (result.rows.length === 0) {
            return res.status(401).json(
                {
                    success: false,
                    message: "No Vehicles found"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
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

const updateVehicle = async (req: Request, res: Response) => {
    try {
        const id = req.params.vehicleId as string


        const result = await vehiclesService.updateVehicle(req.body, id);

        if (result.rows.length === 0) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Vehicle  not updated"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows
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

const deleteVehicle = async (req: Request, res: Response) => {

    try {
        const id = req.params.vehicleId as string;

        const result = await vehiclesService.deleteVehicle(id);
        console.log(result)
        if (result.rowCount === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Somethisn went wrong"
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: "Vehicle deleted successfully"
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

export const vehiclesController = {
    addNewVehicle,
    viewAllVehicles,
    viewSingleVehicle,
    updateVehicle,
    deleteVehicle
}
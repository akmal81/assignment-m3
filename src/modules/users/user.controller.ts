import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await userServices.getAllUsers();
        if (result.rows.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "No user retrived"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Users retrieved successfully",
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId as string;

    const result = await userServices.updateUser(req.body, id);


    if (result.rows.length === 0) {
        return res.status(400).json(
            {
                success: false,
                message: "Something went wrong"
            }
        )
    }

    return res.status(200).json(
        {
            success: true,
            message: "User updated successfully",
            data:result.rows[0]
        }
    )
    } catch (error:any) {
            return res.status(400).json(
                {
                    success:true,
                    messge: error.message
                }
            )
    }


}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.userId as string)
        if(result.rowCount === 0){
            return res.status(400).json({
                success:false,
                message:"Some thing went wrong"
            })
        }

        return res.status(200).json(
            {
                success:true,
                message:"User deleted successfully"
            }
        )
    } catch (error:any) {
        res.status(400).json(
            {
                success:false,
                message: error.message
            }
        )
    }
}

export const userController = {
    getAllUsers,
    updateUser,
    deleteUser
}
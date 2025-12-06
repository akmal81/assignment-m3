import { Request, Response } from "express"
import { authService } from "./auth.service"
import { utility } from "../../utils/utility"

const singUpNewUser = async (req: Request, res: Response) => {

    try {
        // check email case
        if (req.body.email) {
            const result = utility.checkCase(req.body.email);
            if (result) {
                return res.status(400).json(
                    {
                        success: false,
                        message: "Email must be in lowercase"
                    }
                )
            }
        }

        // check password length
        if (req.body.password.length < 6) {
            return res.status(402).json(
                {
                    success: false,
                    message: "Password length must be atleast 6 charector logn"
                }
            )
        }


        const result = await authService.singUpNewUser(req.body)

        return res.status(200).json(
            {
                success: true,
                message: "User registered successfully",
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


const singinUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await authService.singinUser(email, password);
        return res.status(200).json(
            {
                success: true,
                message: "Login successful",
                data:result
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

export const authController = {
    singUpNewUser,
    singinUser
}
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

        if (req.body.password.length < 6) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password length must be atleast 6 charector logn"
                }
            )
        }
        const roles = ["admin", "customer"]
        if (!roles.includes(req.body.role)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Role must be admin or customer"
                }
            )
        }

        const result = await authService.singUpNewUser(req.body)

        return res.status(201).json(
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
                message:"email already registered",
                error: error.message
            }
        )
    }
}


const singinUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await authService.singinUser(email, password);

        if (result === null) {
            return res.status(400).json(
                {
                    success: true,
                    message: "No user found",
                    error: "Email not found"
                }
            )
        }
        if (result === false) {
            return res.status(400).json(
                {
                    success: true,
                    message: "Password not match",
                    error:"Password legnth must be 6"
                }
            )

        }

        return res.status(200).json(
            {
                success: true,
                message: "Login successful",
                data: result
            }
        )
    } catch (error: any) {
        return res.status(400).json(
            {
                success: false,
                message: error.message,
                error:error.message
            }
        )
    }
}

export const authController = {
    singUpNewUser,
    singinUser
}
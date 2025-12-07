import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { config } from "../config";
import { pool } from "../config/db";

const auth = (...roles: ('admin' | 'customer')[]) => {


    return async (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = req.headers.authorization

        if (!bearerToken || !bearerToken.startsWith("Bearer ")) {

            return res.status(401).json(
                {
                    success: false,
                    message: "Unauthorize: Please provide token",

                }
            )
        }

        const token = bearerToken?.split(' ')[1]
        const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload

        const user = await pool.query(`
            SELECT id, name, email, role FROM users WHERE email = $1
            `, [decoded.email]);

        /* decoded =   id: 6,                                                                               LCJlbWFpbCI6ImphcmlyQGdtYWlsLmNv
           name: 'Jarir Hossain',                                                               HKYwhuIenZ6CiossbXBHIcAUpT788O8'
           email: 'jarir@gmail.com',
           role: 'admin',        
           iat: 1765022729,
           exp: 1765627529 */

        if (user.rows.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        req.user = decoded;
        //admin
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json(
                {
                    success: false,
                    message: "Forbidden: Please provide valid token",

                }
            )
        }

        next()
    }
}

export default auth;
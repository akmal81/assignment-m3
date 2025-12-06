import express, { Request, Response } from "express"
import initDb from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { userRoutes } from "./modules/users/user.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";

const app = express();

app.use(express.json());

initDb()

app.get('/', (req: Request, res: Response) => {
    res.send("Project Assignment - 2 ")
})

// api

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/vehicles', vehiclesRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/bookings', bookingsRoutes)

// end

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})



export default app;
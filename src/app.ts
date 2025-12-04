import express, { Request, Response } from "express"
import initDb from "./config/db";

const app = express();

app.use(express.json());

initDb()

app.get('/', (req: Request, res: Response) => {
    res.send("Project Assignment - 2 ")
})

// api

// app.use('/api/vi/auth')
// app.use('/api/v1/vehicles')
// app.use('/api/v1/users')
// app.use('/api/v1/bookings')

// end

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})



export default app;
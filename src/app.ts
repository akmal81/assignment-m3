import express, { Request, Response } from "express"

const app = express();

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send("Project Assignment - 2 ")
})
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})



export default app;
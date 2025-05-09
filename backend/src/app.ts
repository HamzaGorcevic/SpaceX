import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import travelCardRouter from "./routes/LaunchesRoutes"
const app = express()
app.use(cors({
    origin:["http://localhost:5173","https://spacex-production-e945.up.railway.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json())
app.use("/api/launches",travelCardRouter)
export default app
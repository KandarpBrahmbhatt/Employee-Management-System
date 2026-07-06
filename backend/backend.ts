import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { connectDB } from './config/db'
import employeessRouter from './routes/employess.routes'
import VideoRoutes from './routes/cropVideo.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/employees",employeessRouter)
app.use("/api/video",VideoRoutes)
const port = 5000
app.listen(port,()=>{
    console.log(`server is started at ${port}`)
    connectDB()
})
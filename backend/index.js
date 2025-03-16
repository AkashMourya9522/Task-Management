import express from 'express'
import authRoute from './routes/auth.route.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import listingRoute from './routes/task.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import job from './job.js'

const app = express()
dotenv.config()

app.listen(3000,()=>{
    console.log("Listening to port 3000")
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected To Database");
})
.catch((err)=>{
    console.log("Database Connection Failed",err);
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/task",listingRoute)
app.use("/api/user",userRoute)

app.get("/test",(req,res)=>{
    res.json({
        msg:"hi"
    })
})
import express from 'express'
import auth from './routes/auth.route.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import listing from './routes/task.route.js'
import cookieParser from 'cookie-parser'

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

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",auth)
app.use("/api/task",listing)

app.get("/test",(req,res)=>{
    res.json({
        msg:"hi"
    })
})
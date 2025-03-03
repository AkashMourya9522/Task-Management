import express from 'express'
import auth from './routes/auth.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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

app.use("/api/auth",auth)

app.get("/test",(req,res)=>{
    res.json({
        msg:"hi"
    })
})
import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

const User = new mongoose.model("User",userSchema)

export default User
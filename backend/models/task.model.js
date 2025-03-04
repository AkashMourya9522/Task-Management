import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    completed:{
        default:false,
        type:Boolean
    },
    userRef:{
        type:String,
        required:true
    }
})

const Task = new mongoose.model('Task',taskSchema)

export default Task
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
    priority:{
        type:Boolean,
        default:false
    },
    completeBy:{
        type:Date
    },
    userRef:{
        type:String,
        required:true
    }
},{timestamps:true})

const Task = new mongoose.model('Task',taskSchema)

export default Task
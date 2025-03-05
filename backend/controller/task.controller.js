import Task from "../models/task.model.js";


export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId  
    try {
      const newTask = new Task({ title, description,userRef:userId });
      const dbRes = await newTask.save();
      console.log(dbRes);
      
      res.status(200).json(dbRes)
    } catch (error) {      
      return res.status(404).json({
          msg:error,
          success:false
      })
    }
  }

  export const deleteTask = async (req,res)=>{
    const taskId = req.params.id;
    try {
    const task = await Task.findById(taskId)
    if(!task){
      return res.status(404).json({
        msg:"Invalid Request"
      })
    }
     else if(task.userRef == req.userId){
      try {
        await Task.findByIdAndDelete(taskId)
        return res.status(200).json({
          msg:"Task Deleted Successfully",
          success:true
        })
      } catch (error) {
        return res.status(404).json({
          msg:error,
          success:false
        })
      }
    }
    } catch (error) {
      return res.status(404).json({
        msg:`Error Occurred ${error}`,
        success:false
      })
    }
    
  }
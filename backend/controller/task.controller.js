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
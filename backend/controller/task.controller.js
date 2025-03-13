import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  try {
    const newTask = new Task({ title, description, userRef: userId });
    const dbRes = await newTask.save();
    res.status(200).json(dbRes);
  } catch (error) {
    return res.status(404).json({
      msg: error,
      success: false,
    });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        msg: "Invalid Request",
      });
    } else if (task.userRef == req.userId) {
      try {
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
          msg: "Task Deleted Successfully",
          success: true,
        });
      } catch (error) {
        return res.status(404).json({
          msg: error,
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      msg: `Error Occurred ${error}`,
      success: false,
    });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(404).json({
      msg: "Provide Task Id",
      success: false,
    });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        msg: "Task Not Found",
        success: false,
      });
    } else {
      const userId = task.userRef;
      if (userId == req.userId) {
        const { title, description, completed } = req.body;
        const dbRes = await Task.findByIdAndUpdate(
          taskId,
          { title, description, completed },
          { new: true }
        );
        return res.status(200).json({
          msg: "Task Updated Successfully",
          success: true,
          data: dbRes,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      msg: error,
      success: false,
    });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await Task.find({ userRef: userId });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(404).json({
      msg: error,
      success: false,
    });
  }
};

export const getTask = async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(404).json({
      msg: "Task Not Found",
      success: false,
    });
  }
  try {
    const task = await Task.findById(taskId);
    if (task.userRef != req.userId) {
      return res.status(404).json({
        msg: "UnAuthorized",
        success: false,
      });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {}
};

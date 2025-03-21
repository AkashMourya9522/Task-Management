import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, priority, completeBy, userMail } = req.body;
  const userId = req.userId;
  const saveData = {};
  if (title) saveData.title = title;
  if (description) saveData.description = description;
  if (priority) saveData.priority = priority;
  if (completeBy) saveData.completeBy = completeBy;
  if (userMail) saveData.userMail = userMail;
  if (userId) saveData.userRef = userId;

  try {
    const newTask = new Task(saveData);
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
        const { title, description, completed, priority, completeBy } =
          req.body;
        const dbRes = await Task.findByIdAndUpdate(
          taskId,
          { title, description, completed, priority, completeBy },
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
  let filter = req.query.filter;
  let order = req.query.order;
  let completed = req.query.completed;

  if (filter == "priority") {
    order = -1;
  }

  try {
    const tasks = await Task.find({
      userRef: userId,
      completed: completed,
    }).sort({ [filter]: order });

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

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

export const getCompletedTasks = async (req, res) => {
  const userId = req.params.id
  try {
    const task = await Task.find({completed:true,userRef:req.userId});
    if (userId != req.userId) {
      return res.status(404).json({
        msg: "UnAuthorized",
        success: false,
      });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {}
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState(false);

  const navigate = useNavigate();
  async function getTaskData() {
    const dbRes = await axios.get("/api/task/getTask/" + id, {
      withCredentials: true,
    });
    console.log(dbRes);

    setTitle(dbRes.data.title);
    setDescription(dbRes.data.description);
    setCompleted(dbRes.data.completed);
    setPriority(dbRes.data.priority);
  }
  useEffect(() => {
    getTaskData();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.put(
        `/api/task/update/${id}`,
        { title, description, completed, priority },
        {
          withCredentials: true,
        }
      );
      if (dbRes.data.success) {
        toast.success("Task Updated Successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTask() {
    try {
      const dbRes = await axios.delete("/api/task/delete/" + id);
      if (dbRes.data.success == true) {
        toast.success(dbRes.data.msg);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-5 bg-slate-200">
      <h1 className="text-3xl font-semibold">Edit Task</h1>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-5 bg-slate-300 p-5 mx-auto w-full sm:max-w-lg rounded-lg"
      >
        <p className="text-xl font-bold">Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="p-3 bg-slate-200 rounded-lg outline-none font-semibold"
        />
        <p className="text-xl font-bold">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3 bg-slate-200 rounded-lg outline-none font-semibold border-2 border-slate-300"
        ></textarea>
        <div className="flex  gap-2 items-center">
          <input
            checked={completed}
            onChange={() => setCompleted((prev) => !prev)}
            type="checkbox"
            className="w-4 h-4"
          />
          <p className="text-md font-bold">Mark As Completed</p>
        </div>
        <div className="flex  gap-2 items-center">
          <input
            checked={priority}
            onChange={() => setPriority((prev) => !prev)}
            type="checkbox"
            className="w-4 h-4"
          />
          <p className="text-md font-bold">Mark As Priority</p>
        </div>
        <button className="p-3 bg-green-400 rounded-lg">Submit Changes</button>
        <button
          onClick={handleDeleteTask}
          type="button"
          className="p-3 bg-red-400 rounded-lg"
        >
          Delete Task
        </button>
      </form>
    </div>
  );
}

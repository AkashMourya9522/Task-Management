import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../components/Task";
import { useNavigate } from "react-router-dom";

export default function CompletedTask() {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  console.log(task);

  async function getData() {
    try {
      const dbRes = await axios.get("/api/task/getTasks", {
        withCredentials: true,
      });
      setTask(dbRes.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleClick(id) {
    navigate("/task/" + id);
  }

  return (
    <div className="flex flex-col gap-5 bg-blue-400 p-3">
      <h1 className="text-3xl font-semibold text-center p-3">All Your Completed Tasks</h1>
      <div className="flex flex-wrap gap-6 justify-center p-3">
        {task.map(
          (t, i) =>
            t.completed == true && (
              <Task onClick={() => handleClick(t._id)} key={t._id} data={t} />
            )
        )}
      </div>
    </div>
  );
}

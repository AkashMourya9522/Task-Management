import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../components/Task";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CompletedTask() {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const {_id} = useSelector((state)=>state.user.user)

  async function getData() {
    try {
      const dbRes = await axios.get("/api/task/getCompletedTasks/"+_id, {
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
    <div className="flex flex-col gap-5 bg-stone-200 p-3 ">
      <h1 className="text-4xl font-bold uppercase text-center p-3">All Your Completed Tasks</h1>
      <div className="flex flex-wrap gap-6 justify-center p-3">
        {task.length == 0 && <h1 className="text-red-500 font-bold text-xl">You Have No Completed Tasks!</h1> }
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

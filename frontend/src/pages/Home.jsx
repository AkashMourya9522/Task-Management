import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../components/Task";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("priority");
  const [order, setOrder] = useState("-1");
  const navigate = useNavigate();
  
  async function getData() {
    try {
      const dbRes = await axios.get(
        `/api/task/getTasks?filter=${filter}&order=${order}`,
        {
          withCredentials: true,
        }
      );
      setTask(dbRes.data);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, [filter,order]);

  async function handleClick(id) {
    navigate("/task/" + id);
  }

  function handleFilter(e) {
    setFilter(e.target.value.split("_")[0]);
    setOrder(e.target.value.split("_")[1]);
  }

  return (
    <div className="flex flex-col items-center gap-5 bg-blue-400 p-3">
      <h1 className="text-3xl font-semibold text-center p-3">All Your Tasks</h1>
      <select
        onChange={handleFilter}
        className="max-w-lg outline-none bg-white p-3 rounded-lg"
        value={`${filter}_${order}`}
      >
        <option value="createdAt_asc">Oldest</option>
        <option value="createdAt_desc">Newest</option>
        <option  value="priority_-1">High Priority</option>
      </select>
      <div className="flex flex-wrap gap-6 justify-center p-3">
        {task.map(
          (t, i) =>
            t.completed == false && (
              <Task onClick={() => handleClick(t._id)} key={t._id} data={t} />
            )
        )}
      </div>
    </div>
  );
}

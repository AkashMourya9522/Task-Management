import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const navigate = useNavigate();
console.log(priority);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.post(
        `/api/task/create`,
        { title, description,priority },
        {
          withCredentials: true,
        }
      );
      toast.success("Task Created Successfully");
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.messsage);
      console.log(error.response.data.messsage);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-5 bg-slate-300 p-5 mx-auto w-full sm:max-w-lg rounded-lg"
      >
        <p className="text-xl font-semibold">Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="p-3 bg-slate-200 rounded-lg outline-none border-2 border-slate-300"
          placeholder="Title For Your Task"
        />
        <p className="text-xl font-semibold">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3 bg-slate-200 rounded-lg outline-none border-2 border-slate-300"
          placeholder="Description For You Task"
        ></textarea>
        <div className="flex gap-2 items-center ">
          <input
            checked={priority}
            type="checkbox"
            onChange={() => setPriority((prev) => !prev)}
            className="w-4 h-4"
          />
          <p>Mark As Important</p>
        </div>
        <button className="p-3 bg-green-400 rounded-lg uppercase font-semibold">
          Create Task
        </button>
      </form>
    </div>
  );
}

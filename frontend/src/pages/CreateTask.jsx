import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.post(
        `/api/task/create`,
        { title, description },
        {
          withCredentials: true,
        }
      );
      toast.success("Task Created Successfully");
      navigate("/home");
    } catch (error) {
        toast.error(error.response.data.messsage)
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
          className="p-3 bg-slate-200 rounded-lg outline-none"
          placeholder="Title For Your Task"
        />
        <p className="text-xl font-semibold">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3 bg-slate-200 rounded-lg outline-none"
          placeholder="Description For You Task"
        ></textarea>
        <button className="p-3 bg-green-400 rounded-lg uppercase font-semibold">
          Create Task
        </button>
      </form>
    </div>
  );
}

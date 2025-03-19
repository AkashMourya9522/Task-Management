import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [completeBy, setCompleteBy] = useState("");
  const navigate = useNavigate();
  const {email} = useSelector((state)=>state.user.user)
  console.log(email);
  
  console.log(priority);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.post(
        `/api/task/create`,
        { title, description, priority, completeBy, userMail:email  },
        {
          withCredentials: true,
        }
      );
      console.log(dbRes.data);
      
      toast.success("Task Created Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.messsage);
      console.log(error.response.data.messsage);
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold uppercase text-center p-5">Create A Task</h1>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-5 bg-white p-5 mx-auto max-w-lg rounded-lg"
      >
        <p className="text-xl font-semibold">Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="p-3  rounded-lg outline-none border-2 border-slate-300"
          placeholder="Title For Your Task"
        />
        <p className="text-xl font-semibold">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3  rounded-lg outline-none border-2 border-slate-300"
          placeholder="Description For You Task"
        ></textarea>
        <p className="text-xl font-bold">Due Date</p>
        <input
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setCompleteBy(e.target.value);
          }}
          type="date"
          name=""
          id=""
        />
        <div className="flex gap-2 items-center ">
          <input
            checked={priority}
            type="checkbox"
            onChange={() => setPriority((prev) => !prev)}
            className="w-4 h-4"
          />
          <p>Mark As Important</p>
        </div>
        <button className="p-3 bg-green-400 rounded-lg uppercase text-white font-semibold hover:opacity-90 hover:cursor-pointer">
          Create Task
        </button>
      </form>
    </div>
  );
}

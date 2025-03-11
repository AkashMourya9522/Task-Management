import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  async function getTaskData() {
    const dbRes = await axios.get("/api/task/getTask/" + id, {
      withCredentials: true,
    });
    console.log(dbRes);

    setTitle(dbRes.data.title);
    setDescription(dbRes.data.description);
  }
  useEffect(() => {
    getTaskData();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.put(
        `/api/task/update/${id}`,
        { title, description },
        {
          withCredentials: true,
        }
      );
      if (dbRes.data.success) {
        toast.success("Task Updated Successfully");
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-5 bg-slate-300 p-5 mx-auto w-full sm:max-w-lg rounded-lg"
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="p-3 bg-slate-200 rounded-lg outline-none"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3 bg-slate-200 rounded-lg outline-none"
        ></textarea>
        <button className="p-3 bg-green-400 rounded-lg">Submit Changes</button>
      </form>
    </div>
  );
}

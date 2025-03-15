import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../redux/user/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  console.log(username, email, password);

  async function handleSubmitChanges(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.put("/api/user/update/" + user._id, {
        username,
        email,
        password,
      });
      dispatch(updateUser(dbRes.data));
      toast.success("User Details Updated Successfully");
    } catch (error) {
      console.log(error.msg);
    }
  }

  return (
    <div className="bg-stone-200 h-screen p-5 ">
      <form
        onSubmit={handleSubmitChanges}
        className="bg-white p-5 flex flex-col gap-5 rounded-lg max-w-lg mx-auto my-10"
      >
        <h1 className="text-3xl font-bold p-3">
          Welcome <span className="text-green-400">{username}</span>
        </h1>
        <p className="text-lg font-semibold">Username</p>
        <input
          type="text"
          className="p-3 border-2 border-slate-200 rounded-lg outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="text-lg font-semibold">Password</p>
        <input
          type="text"
          className="p-3 border-2 border-slate-200 rounded-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-lg font-semibold">Email</p>
        <input
          type="text"
          className="p-3 border-2 border-slate-200 rounded-lg outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-green-400 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-90 hover:cursor-pointer">
          Submit Changes
        </button>
      </form>
    </div>
  );
}

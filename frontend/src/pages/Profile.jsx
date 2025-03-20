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
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center p-3 uppercase">Profile</h1>
      <form
        onSubmit={handleSubmitChanges}
        className="bg-white p-5 flex flex-col gap-5 rounded-lg max-w-lg mx-auto my-10 border-2 border-slate-200"
      >
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

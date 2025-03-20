import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../redux/user/userSlice";

export default function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      toast.error("Fill In The Details!");
    } else {
      try {
        const dbRes = await axios.post("/api/auth/signin", {
          password,
          email,
        });
        dispatch(signIn(dbRes.data));
        navigate("/home");
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center uppercase p-5">Sign In</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-5 max-w-lg mx-auto p-5"
      >
        <p className="font-semibold text-lg">Email</p>
        <input
          className="p-3 outline-none bg-white rounded-lg font-semibold border-2 border-slate-300"
          placeholder="Enter Email"
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="font-semibold text-lg">Password</p>
        <input
          className="p-3 outline-none bg-white rounded-lg font-semibold border-2 border-slate-300"
          placeholder="Enter Password"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="p-3 bg-green-400 rounded-lg text-white font-semibold uppercase text-lg">
          Sign In
        </button>
        <Link
          className="hover:border-b-2 text-green-400 font-semibold "
          to={"/sign-up"}
        >
          Don't Have An Account?
        </Link>
        {error && <p className="text-red-500 "> {error} </p>}
      </form>
    </div>
  );
}

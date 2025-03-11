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
  const user = useSelector((state) => state.user.user);
  console.log(user);

  async function handleFormSubmit(e) {
    e.preventDefault();
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

  return (
    <div className="bg-slate-200 p-5 flex items-center justify-center h-screen">
      <div className="sm:max-w-lg  w-full">
        <h1 className="text-3xl font-bold text-center uppercase">Sign In</h1>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-5 w-full mb-5"
        >
          <p className="font-semibold text-lg">Email</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold"
            placeholder="Enter Email"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="font-semibold text-lg">Password</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold"
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
        </form>
        <Link
          className="hover:underline text-green-400 font-semibold "
          to={"/sign-up"}
        >
          Don't Have An Account?
        </Link>
        {error && <p className="text-red-500 mt-3"> {error} </p>}
      </div>
    </div>
  );
}

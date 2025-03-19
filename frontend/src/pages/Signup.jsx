import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const dbRes = await axios.post("/api/auth/signup", {
        username,
        password,
        email,
      });
      if (dbRes.data.success) {
        setError(false);
        toast.success(dbRes.data.msg);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    }
  }

  return (
    <div className="p-5">
        <h1 className="text-3xl font-bold text-center uppercase p-5">
          Sign Up
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-5 max-w-lg mx-auto p-5"
        >
          <p className="font-semibold text-lg">Username</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold border-2 border-slate-300"
            placeholder="Enter Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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
          <button
            type="submit"
            className="p-3 bg-green-400 rounded-lg text-white font-semibold uppercase text-lg"
          >
            Sign Up
          </button>
          <Link
          className="my-5 hover:border-b-2 text-green-400 font-semibold "
          to={'/sign-in'}
        >
          Already Have An Account?
        </Link>
        </form>
        
        {error && <p className="text-red-400 mt-3">{error}</p>}
      
    </div>
  );
}

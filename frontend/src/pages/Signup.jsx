import React, { useState } from "react";

export default function Signup() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    console.log(username, password,email);
    
  return (
    <div className="bg-slate-200 p-5 flex items-center justify-center h-screen">
      <div className="sm:max-w-lg  w-full" >
        <h1 className="text-3xl font-bold text-center uppercase my-5">Sign Up</h1>
        <form className="flex flex-col gap-5 w-full ">
          <p className="font-semibold text-lg" >Username</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold"
            placeholder="Enter Username"
            type="text"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
          />
          <p className="font-semibold text-lg" >Email</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold"
            placeholder="Enter Email"
            type="email"
            name="email"
            id="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
          <p className="font-semibold text-lg">Password</p>
          <input
            className="p-3 outline-none bg-white rounded-lg font-semibold"
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
          <button className="p-3 bg-green-400 rounded-lg text-white font-semibold uppercase text-lg">
            Sign Up
          </button>
          <a className="hover:underline text-red-400 font-semibold" href="/sign-in">Already Have An Account?</a>
        </form>
      </div>
    </div>
  );
}

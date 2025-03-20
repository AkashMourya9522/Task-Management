import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOut } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; 

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      const dbRes = await axios.get("/api/auth/signout");
      if (dbRes.data.success) {
        toast.success(dbRes.data.msg);
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700 hover:cursor-pointer" onClick={()=>{navigate('/home')}}>Task Manager</h1>
        <div className="hidden md:flex space-x-6">
          {!user ? (
            <>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 uppercase" to="/sign-up">
                Sign Up
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 uppercase" to="/sign-in">
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 uppercase" to="/home">
                Home
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 uppercase" to="/create-task">
                Create Task
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 uppercase" to="/completed-task">
                Completed Tasks
              </Link>
              <Link className="font-semibold text-slate-500 hover:text-green-400 uppercase" to="/profile">
                Profile
              </Link>
              <button onClick={handleSignOut} className=" font-semibold text-red-500 uppercase cursor-pointer">
                Sign Out
              </button>
            </>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 uppercase">
          {menuOpen ? <X className="hover:cursor-pointer" size={28} /> : <Menu className="hover:cursor-pointer" size={28} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg uppercase">
          {!user ? (
            <>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/sign-up " onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/sign-in" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/home" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/create-task" onClick={() => setMenuOpen(false)}>
                Create Task
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/completed-task" onClick={() => setMenuOpen(false)}>
                Completed Tasks
              </Link>
              <Link className=" font-semibold text-slate-500 hover:text-green-400 w-fit uppercase" to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button onClick={handleSignOut} className=" font-semibold text-red-500 cursor-pointer uppercase">
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

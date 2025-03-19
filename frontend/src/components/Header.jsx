import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOut } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; 

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <h1 className="text-xl font-bold text-gray-700">Task Manager</h1>
        <div className="hidden md:flex space-x-6">
          {!user ? (
            <>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/sign-up">
                Sign Up
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/sign-in">
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/home">
                Home
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/create-task">
                Create Task
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/completed-task">
                Completed Tasks
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400" to="/profile">
                Profile
              </Link>
              <button onClick={handleSignOut} className="text-lg font-semibold text-red-500 cursor-pointer">
                Sign Out
              </button>
            </>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg">
          {!user ? (
            <>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/sign-up " onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/sign-in" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/home" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/create-task" onClick={() => setMenuOpen(false)}>
                Create Task
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/completed-task" onClick={() => setMenuOpen(false)}>
                Completed Tasks
              </Link>
              <Link className="text-lg font-semibold text-slate-500 hover:text-green-400 w-fit" to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button onClick={handleSignOut} className="text-lg font-semibold text-red-500">
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

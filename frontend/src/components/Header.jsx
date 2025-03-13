import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOut } from "../redux/user/userSlice";
import {toast} from 'react-toastify'

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  async function handleSignOut() {
    try {
      const dbRes = await axios.get("/api/auth/signout");
      if (dbRes.data.success) {
        toast.success(dbRes.data.msg);
        dispatch(signOut())
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-around p-5">
      {!user && (
        <>
          <Link
            className="text-lg font-semibold text-slate-500 "
            to={"/sign-up"}
          >
            Sign Up
          </Link>
          <Link
            className="text-lg font-semibold text-slate-500 "
            to={"/sign-in"}
          >
            Sign In
          </Link>
        </>
      )}
      {user && (
        <>
          <Link className="text-lg font-semibold text-slate-500 " to={"/home"}>
            Home
          </Link>
          <Link
            className="text-lg font-semibold text-slate-500 "
            to={"/create-task"}
          >
            Create Task
          </Link>
          <Link
            className="text-lg font-semibold text-slate-500 "
            to={"/completed-task"}
          >
            Completed Tasks
          </Link>
          <Link
            onClick={handleSignOut}
            className="text-lg font-semibold text-slate-500 "
            to={"/sign-in"}
          >
            Sign Out
          </Link>
        </>
      )}
    </div>
  );
}

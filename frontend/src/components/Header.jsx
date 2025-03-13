import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user);
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
      {
        user && (<>
        <Link className="text-lg font-semibold text-slate-500 " to={'/home'}>Home</Link><Link className="text-lg font-semibold text-slate-500 " to={'/create-task'} >
        Create Task
        </Link>
        <Link className="text-lg font-semibold text-slate-500 " to={'/completed-task'} >Completed Tasks</Link>
        
        </>)
      }
    </div>
  );
}

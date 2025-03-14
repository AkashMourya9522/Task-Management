import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Protected() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return <>{user ? <Outlet /> : <Navigate to={"/sign-in"} />}</>;
}

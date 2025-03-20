import React from "react";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import EditTask from "./pages/EditTask.jsx";
import Protected from "./pages/Protected.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import CompletedTask from "./pages/CompletedTask.jsx";
import Profile from "./pages/Profile.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

export default function AnimatedRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/task/:id" element={<EditTask />} />
          <Route path="/completed-task" element={<CompletedTask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Route>

        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  );
}

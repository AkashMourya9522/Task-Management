import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import EditTask from "./pages/EditTask.jsx";
import Protected from "./pages/Protected.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        {/* <Route element={<Protected />}> */}
          <Route path="/home" element={<Home />} />
          <Route path="/task/:id" element={<EditTask />} />
        {/* </Route> */}

        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/create-task" element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

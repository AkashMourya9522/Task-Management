import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import AnimatedRoute from "./AnimatedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoute />
    </BrowserRouter>
  );
}

export default App;

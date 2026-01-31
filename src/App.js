import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingComponents/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);
export default App;

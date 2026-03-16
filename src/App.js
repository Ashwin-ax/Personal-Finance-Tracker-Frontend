import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingComponents/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/TransactionPage";
import Dashboard from "./components/Dashboard";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);
export default App;

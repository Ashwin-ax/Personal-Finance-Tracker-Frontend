import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingComponents/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/TransactionPage";
import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/budget" element={<Budget />} />
    <Route path="/investments" element={<Home />} />
    <Route path="/insights" element={<Home />} />
  </Routes>
);
export default App;

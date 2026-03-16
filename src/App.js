import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingComponents/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/TransactionPage";
import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the gatekeeper

const App = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    {/* Protected Routes - Only accessible if logged in */}
    <Route element={<ProtectedRoute />}>
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/investments" element={<Home />} />
      <Route path="/insights" element={<Home />} />
    </Route>
  </Routes>
);

export default App;

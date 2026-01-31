import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import Cookies from "js-cookie";

import "./index.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currency_preference: "INR",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt-token");
    if (token !== undefined) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          currency_preference: "INR",
        });
        navigate("/login");
        setIsLoading(false);
      } else {
        alert(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      alert("Server Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="app-title">💰 Finance Tracker</h1>
        <p className="subtitle">Create your account</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create a password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Currency Preference</label>
            <select
              onChange={handleChange}
              name="currency_preference"
              value={formData.currency_preference}
            >
              <option value="">Select currency</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="INR">INR (₹)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <button type="submit" className="login-btn">
            {isLoading ? (
              <Bars
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;

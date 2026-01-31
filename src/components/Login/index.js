import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Bars } from "react-loader-spinner";
import "./index.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt-token");
    if (token !== undefined) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt-token", jwtToken, { expires: 7 });
    navigate("/home", { replace: true });
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://personal-finance-tracker-backend-io9r.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data.token);
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
    <div className="login-page">
      <div className="login-card">
        <h1 className="app-title">💰 Finance Tracker</h1>
        <p className="subtitle">Welcome back</p>

        <form className="login-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={handleChange}
            />
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
              "Login"
            )}
          </button>
        </form>

        <p className="register-link">
          Not registered yet?{" "}
          <span onClick={() => navigate("/register")}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

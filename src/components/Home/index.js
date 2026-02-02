import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    Cookies.remove("jwt-token");
    navigate("/", { replace: true });
  };
  return (
    <div className="home-container">
      <div className="background-blur"></div>

      <div className="content-card">
        <h1 className="logo-text">🚀 Project In Progress</h1>

        <p className="subtitle">We're building something amazing for you.</p>

        <div className="loader-wrapper">
          <div className="money-loader"></div>
          <span className="loading-text">Developing Experience...</span>
        </div>

        <div className="features-preview">
          <div className="feature-box">🎯 Smart Features</div>
        </div>

        <p className="footer-text">Stay tuned — big things are coming soon.</p>
        <button className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

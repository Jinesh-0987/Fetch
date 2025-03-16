import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa"; // ✅ Icons for better UI
import "./login.css"; // ✅ Import updated CSS

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("⚠️ Please enter both Name and Email.");
      return;
    }
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        navigate("/dogs"); // ✅ Redirect to dog list page
      } else {
        setError("⚠️ Login failed. Please check your details and try again.");
      }
    } catch (err) {
      setError("⚠️ Network error. Please check your internet connection.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>🐶 Welcome to Dog Finder</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-container">
            <FaUser className="icon" />
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-container">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

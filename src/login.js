import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";  // Ensure API is used for authentication

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    try {
      const success = await login(name, email);
      if (success) {
        navigate("/dogs");  // Redirect to the Dog List page after successful login
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while logging in.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

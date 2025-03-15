import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(name, email);
    if (success) navigate("/dogs");
    else alert("Login failed. Please try again.");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

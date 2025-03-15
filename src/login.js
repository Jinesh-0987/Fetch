import { useState } from "react";

function Login({ onLoginSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            onLoginSuccess();
        } else {
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;

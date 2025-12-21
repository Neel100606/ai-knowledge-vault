import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      // 🔑 STORE TOKEN HERE
      localStorage.setItem("token", res.token);
      navigate("/dashboard");

    } catch (err) {
      console.error("Login failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

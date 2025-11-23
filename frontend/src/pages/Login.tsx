import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    apiClient
      .post("/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userId", res.data.userId);

        navigate("/");
      })
      .catch(() => toast.error("Login failed"));
  };

  const handleRegistry = () => {
    apiClient
      .post("/users/registry", { email, password })
      .then(() => {
        toast.success("Registry successful! You can now log in.");
      })
      .catch(() => toast.error("Registry failed"));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {isLogin ? (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin} style={{ marginTop: "10px" }}>
            Login
          </Button>

          <p style={{ marginTop: "10px" }}>
            Don't have an account?{" "}
            <Button variant="link" onClick={() => setIsLogin(false)}>
              Go to Registry
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <h1>Registry</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleRegistry} style={{ marginTop: "10px" }}>
            Registry
          </Button>

          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <Button variant="link" onClick={() => setIsLogin(true)}>
              Go to Login
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

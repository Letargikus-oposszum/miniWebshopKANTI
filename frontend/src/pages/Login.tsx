import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button, Row, Form } from "react-bootstrap";

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
      .post("/users/register", { email, password })
      .then(() => {
        toast.success("Registry successful! You can now log in.");
      })
      .catch(() => toast.error("Registry failed"));
  };

  return (
    <>
      {isLogin ? (
        <Form noValidate>
          <h1>Login</h1>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="strong password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button onClick={handleLogin}>Submit form</Button>
          <Button onClick={() => setIsLogin(false)}>Switch to Register</Button>
        </Form>
      ) : (
        <Form noValidate>
          <h1>Register</h1>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="strong password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button onClick={handleRegistry}>Submit form</Button>
          <Button onClick={() => setIsLogin(true)}>Switch to Login</Button>
        </Form>
      )}
    </>
  );
};

export default LoginPage;

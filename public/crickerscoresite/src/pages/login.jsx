import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token); //saving the token
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="background">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col sm="8" md="6">
            <Card className="login-card">
              <CardBody>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" block>
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <p>
                    Not registered yet? <a href="/register">Sign up</a> instead
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

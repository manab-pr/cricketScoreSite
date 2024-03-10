import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
      const token =response.data.token;
      localStorage.setItem('token',token);  //saving the token 
      navigate('/')
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="background">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col sm="8" md="6">
            <Card>
              <CardBody>
                <h2 className="text-center mb-4">Register Yourself</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                  <Button type="submit" color="primary" block>Register</Button>
                </Form>
                <div className="text-center mt-3">
                  <p>Already registered? <a href='/login'>Sign in</a> instead</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;

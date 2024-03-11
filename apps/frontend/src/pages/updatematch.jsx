import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");

const UpdateMatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamone: "",
    teamtwo: "",
    matchdate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:5000/api/v1/match", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/matches");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="background">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col sm="8" md="6">
            <Card className="match-card">
              <CardBody>
                <h2>Update Match 🏏</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="teamone"> Team One🏏:</label>
                    <input
                      type="text"
                      id="teamone"
                      name="teamone"
                      value={formData.teamone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="teamtwo"> Team Two🏏:</label>
                    <input
                      type="text"
                      id="teamtwo"
                      name="teamtwo"
                      value={formData.teamtwo}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="matchdate">matchdate:</label>
                    <input
                      type="text"
                      id="matchdate"
                      name="matchdate"
                      value={formData.matchdate}
                      onChange={handleChange}
                    />
                  </div>
                  <Row className="justify-content-center mt-3">
                    <Button color="primary" type="submit" onSubmit={handleSubmit}>
                      Update Match
                    </Button>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateMatch;

import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
const token = localStorage.getItem("token");

const CreateScore = () => {
  let { matchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    batting: "",
    bowling: "",
    wickets: 0,
    batterOne: "",
    batterTwo: "",
    over: 0,
    run: 0,
    batterOneBowl: 0,
    batterTwoBowl: 0,
    batterOneRun: 0,
    batterTwoRun: 0,
    bowler: "",
    bowlerBowled: 0,
    matchdate: "",
    scoreid: matchId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_APP_CREATE_SCORE}/${matchId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/score/${matchId}`);
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
                <h2>Create Scorecard 🏏</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="batting">Batting Team🏏:</label>
                    <input
                      type="text"
                      id="batting"
                      name="batting"
                      value={formData.batting}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bowling">Bowling Team 🏏:</label>
                    <input
                      type="text"
                      id="bowling"
                      name="bowling"
                      value={formData.bowling}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="wickets">Wickets ☝️:</label>
                    <input
                      type="number"
                      id="wickets"
                      name="wickets"
                      value={formData.wickets}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterOne">batterOne:</label>
                    <input
                      type="text"
                      id="batterOne"
                      name="batterOne"
                      value={formData.batterOne}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterTwo">batterTwo:</label>
                    <input
                      type="text"
                      id="batterTwo"
                      name="batterTwo"
                      value={formData.batterTwo}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="over">over:</label>
                    <input
                      type="number"
                      id="over"
                      name="over"
                      value={formData.over}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="run">run:</label>
                    <input
                      type="number"
                      id="run"
                      name="run"
                      value={formData.run}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterOneBowl">batterOneBowl:</label>
                    <input
                      type="number"
                      id="batterOneBowl"
                      name="batterOneBowl"
                      value={formData.batterOneBowl}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterTwoBowl">batterTwoBowl:</label>
                    <input
                      type="number"
                      id="batterTwoBowl"
                      name="batterTwoBowl"
                      value={formData.batterTwoBowl}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterOneRun">batterOneRun:</label>
                    <input
                      type="number"
                      id="batterOneRun"
                      name="batterOneRun"
                      value={formData.batterOneRun}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="batterTwoRun">batterTwoRun:</label>
                    <input
                      type="number"
                      id="batterTwoRun"
                      name="batterTwoRun"
                      value={formData.batterTwoRun}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bowler">bowler:</label>
                    <input
                      type="text"
                      id="bowler"
                      name="bowler"
                      value={formData.bowler}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bowlerBowled">bowlerBowled:</label>
                    <input
                      type="number"
                      id="bowlerBowled"
                      name="bowlerBowled"
                      value={formData.bowlerBowled}
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
                    <Button color="primary" type="submit">
                      Create Score
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

export default CreateScore;

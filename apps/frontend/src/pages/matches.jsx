import React, { useState, useEffect } from "react";
import {Container,Row,Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import countries  from '../icons/country.json';



const token = localStorage.getItem("token");

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [userRole, setUserRole] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.role) {
      const role = decodedToken.role;
      console.log("User Role:", role);
      setUserRole(role); 
    } else {
      console.log("Role not found in the token.");
    }
  }, []); 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data.match);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Function to handle click on a match card
  const handleMatchClick = (matchId) => {
    navigate(`/score/${matchId}`);
    console.log(`Clicked on match with ID ${matchId}`);
  };

  //function to handle create Match button
  const handleCreateScorecard =(matchId)=>{
      navigate(`/createscore/${matchId}`)
  }

  //to create match
  const handleCreatematch =()=>{
    navigate("/creatematch");
  }
  
  //update match
const handleUpdatematch =(matchId)=>{
  navigate(`/updatematch/${matchId}`)
}



  //delete match
  const handleDeletematch =(matchId)=>{
    navigate(`/deletematch/${matchId}`)
  }




  const getCountryFlag = (countryName) => {
    const matchedCountry = countries.find(country => country.country === countryName);
    if (matchedCountry) {
      return <img src={matchedCountry.flag} alt={matchedCountry.country} />;
    }
    return null;
  };



  return (
    <div className="background">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col>
            <h2>Matches</h2>
            <div className="match-list">
              {matches.map((match) => (
                <Card key={match._id} className="mb-3">
                  <CardBody>
                    <CardTitle tag="h5">{match.title}</CardTitle>
                    <CardText>
                      <strong>{match.teamone}</strong> <br/>
                      <strong>Vs</strong> <br/>
                      <strong>{match.teamtwo}</strong> 
                      <br />
                      <strong>On</strong> {match.matchdate}
                    </CardText>
                    <Button color="primary" onClick={() => handleMatchClick(match._id)}>
                      View Scorecard
                    </Button>
                    {userRole === "admin" &&<Button style={{ marginLeft: '5px' }}  color="primary" onClick={() => handleCreateScorecard(match._id)}>
                      Create Scorecard
                    </Button>}<br/>
                    {userRole === "admin" &&<Button  style={{ marginRight: '5px' ,marginTop:'5px'}} color="primary" onClick={() => handleUpdatematch(match._id)}>
                      Update Match
                    </Button>}
                    {userRole === "admin" &&<Button style={{marginTop:'5px'}} color="primary" onClick={() => handleDeletematch(match._id)}>
                      Delete Match
                    </Button>}
                  </CardBody>
                  <CardBody>
                    {getCountryFlag(match.country)}
                  </CardBody>
                </Card>
              ))}
            </div>
            <Row className="justify-content-center mt-3">
              <Col>
                {userRole === "admin" && <Button color="primary" onClick={handleCreatematch}>Create Match</Button>}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Matches;

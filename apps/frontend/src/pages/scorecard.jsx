import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const token = localStorage.getItem("token");


const Scorecard = () => {
  let { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
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
    const fetchMatchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_APP_GET_MATCH_BY_ID}/${matchId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMatchDetails(response.data.score);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (!matchDetails) {
    return <div className="background" style={{textAlign:"center"}}><b>Wait till the match starts...</b></div>;
  }
  
  const handleUpdateScore =()=>{
    navigate(`/updatescore/${matchId}`);
  }
  const handleDeletematch =()=>{
    navigate(`/deletescore/${matchId}`);
  }






  const {
    matchdate,
    batting,
    bowling,
    batterOne,
    batterTwo,
    batterOneBowl,
    batterOneRun,
    batterTwoBowl,
    batterTwoRun,
    bowler,
    bowlerBowled,
    wickets,
    over,
    run,
  } = matchDetails;

const StrikeRateOne =Math.floor(batterOneRun*100/batterOneBowl);
const StrikeRateTwo =Math.floor(batterTwoRun*100/batterTwoBowl);

  return (
    <div className="background">

    <div className="container" >
      <Card>
      <h2 style={{textAlign:"center"}}>{batting} has won the toss and decided to bat first</h2>
      </Card>
      <div className="row">
        <div className="col-md-6">
          <Card className="h-100">
            <CardBody>
              <CardTitle tag="h5">Match Details</CardTitle>
              <CardText>
                <strong>Date:</strong> {matchdate}
                <br />
                <strong>Batting Team:</strong> {batting}
                <br />
                <strong>Bowling Team:</strong> {bowling}
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="h-100">
            <CardBody>
              <CardTitle tag="h5">Innings Details</CardTitle>
              <CardText>
                <strong>{batterOne}:</strong> ({batterOneRun} runs, {batterOneBowl} bowls,{StrikeRateOne} SR)
                <br />
                <strong>{batterTwo}:</strong>({batterTwoRun} runs, {batterTwoBowl} bowls,{StrikeRateTwo} SR)
                <br />
                <strong>{bowler}:</strong> {bowlerBowled} bowl, ({wickets} wickets)
                <br />
                <strong>Over:</strong> {over}
                <br />
                <strong>Run:</strong> {run}
                
                
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
      {userRole === 'admin' && (
        <div className="row mt-3">
          <div className="col-md-6">
            <Button color="primary" onClick={handleUpdateScore} block>Update Score</Button>
          </div>
          <div className="col-md-6">
            <Button color="danger" onClick={handleDeletematch} block>Delete Score</Button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Scorecard;

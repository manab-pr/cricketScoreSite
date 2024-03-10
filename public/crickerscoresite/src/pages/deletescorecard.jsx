import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const token = localStorage.getItem("token");

const DeleteScore = () => {
  let { matchId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
        await axios.delete(
        `http://localhost:5000/api/v1/score/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/matches");
    } catch (error) {
      console.error("Deletion failed", error);
    }
  };

  return (
    <div className="background">
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Card style={{ width: '300px' }}>
      <CardBody>
        <CardTitle tag="h2">Delete Score</CardTitle>
        <h5>Are you sure you want to delete this score card?</h5>
        <Button color="danger" onClick={handleDelete} block>Delete Score</Button>
      </CardBody>
    </Card>
  </div>
  </div>
  );
};

export default DeleteScore;

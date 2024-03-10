import React from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";

const token = localStorage.getItem("token");

const DeleteScore = () => {
  let { matchId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
        await axios.delete(
        `http://localhost:5000/api/v1/match/${matchId}`,
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
        <CardTitle tag="h2">Delete Match</CardTitle>
        <h5>Are you sure you want to delete this match?</h5>
        <Button color="danger" onClick={handleDelete} block>Delete Match</Button>
      </CardBody>
    </Card>
  </div>
  </div>
  );
};

export default DeleteScore;

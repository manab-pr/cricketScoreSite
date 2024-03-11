import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//land page
import HomePage from "./pages/home";

//User registration  & login
import Register from "./pages/register";
import Login from "./pages/login";

//get methods
import Matches from "./pages/matches";
import Scorecard from "./pages/scorecard";

//create
import CreateMatch from "./pages/creatematch";
import CreateScore from "./pages/createscore";

//update
import UpdateMatch from "./pages/updatematch";
import UpdateScore from "./pages/updatescorecard";

//delete
import DeleteMatch from "./pages/deletematch";
import DeleteScore from "./pages/deletescorecard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/matches" element={<Matches />} />
        <Route path="/score/:matchId" element={<Scorecard />} />

        <Route path="/createscore/:matchId" element={<CreateScore />} />
        <Route path="/creatematch" element={<CreateMatch />} />

        <Route path="/updatematch/:matchId" element={<UpdateMatch />} />
        <Route path="/updatescore/:matchId" element={<UpdateScore />} />

        <Route path="/deletematch/:matchId" element={<DeleteMatch />} />
        <Route path="/deletescore/:matchId" element={<DeleteScore />} />
      </Routes>
    </Router>
  );
};

export default App;

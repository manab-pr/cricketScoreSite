import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode"; 

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setIsLoggedIn(true); 
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.name) {
        const name = decodedToken.name;
        console.log("User name:", name);
        setUserName(name); 
      } else {
        console.log("Name not found in the token.");
      }
    } else {
      setIsLoggedIn(false); 
    }
  }, []); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get(import.meta.env.VITE_APP_LOGOUT_URL);
      localStorage.removeItem("token"); 
      setIsLoggedIn(false); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={{ backgroundImage: `url('https://media.istockphoto.com/id/477345251/vector/cricket-match.jpg?s=2048x2048&w=is&k=20&c=OlRY6804u398IXuu2KEhSPlMsQclGAH3i2ZsQHYzTyw=')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><b>CricFlix🏏</b></NavbarBrand>
        <Nav className="ml-auto" navbar>
          {isLoggedIn ? (
            <React.Fragment>
                 <NavItem>
                    <NavLink href="/matches"><b>Matches</b></NavLink>
                </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle nav caret>
                <b>{userName}</b>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
               
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavItem>
                <NavLink href="/login"><b>Login</b></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register"><b>Register</b></NavLink>
              </NavItem>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
      <Container className="mt-3">
        <Row>
          <Col>
            <h2 className="text-center" style={{color:"white"}}><b>HIGHLIGHTS</b></h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Times of India</CardTitle>
                <p>Major blow for team India...</p>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>News Austrilia</CardTitle>
                <p>Warner is retiring...</p>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Wasgington Telegraph</CardTitle>
                <p>USA to play WT20 2024!...</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

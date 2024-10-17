import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarDisplay = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>

        <Nav className="me-auto">

          <Nav.Link as={Link} to="/Publish_news">Publish News</Nav.Link>
          <Nav.Link as={Link} to="/publish_ads">Publish Ads</Nav.Link>
          <Nav.Link as={Link} to="/SetBanner">Banner</Nav.Link>
          <Nav.Link as={Link} to="/getAdsId">Ad's ID</Nav.Link>
          <Nav.Link as={Link} to="/DeleteItem">Delete</Nav.Link>
          {/*
          active this feature in next update 
          <Nav.Link as={Link} to="/search">Search</Nav.Link> */}
          <Nav.Link as={Link} to="/Logout">LogOut</Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarDisplay;

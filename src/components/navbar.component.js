import React, { Component } from 'react';
import { Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import logo from '../img/brlogo_sm.png';

import '../css/stack-interface.css';

export default class BRNavbar extends Component {
    render () {
        return(
            <Navbar id="menu1" className="lawnavbg" fixed="top" bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img className="logo" alt="logo" src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item><Nav.Link href="http://www.bellripper.com/">Home</Nav.Link></Nav.Item>
                        <Nav.Link href="http://www.bellripper.com/aboutus.html">About Us</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="http://www.bellripper.com/lifeandestateplanning.html">Life and Estate Planning</NavDropdown.Item>
                            <NavDropdown.Item href="http://www.bellripper.com/mediation.html">Mediation</NavDropdown.Item>
                            <NavDropdown.Item href="http://www.bellripper.com/familylaw.html">Family Law</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="http://www.bellripper.com/new-clients.html">New Clients</Nav.Link>
                        <Nav.Link href="http://www.bellripper.com/resources.html">Resources</Nav.Link>
                        <Nav.Link href="http://www.bellripper.com/contact-us.html">Contact Us</Nav.Link>
        
                        {/* TODO Create Signout/user portal button */}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
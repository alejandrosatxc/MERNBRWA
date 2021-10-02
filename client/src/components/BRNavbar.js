import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../img/brlogo_sm.png';
import { logout } from '../actions/authActions'

import '../css/stack-interface.css';
const BRNavbar = () => {
    //const dispatch = useDispatch();

    const handleLogout = () => {
        logout();
    }
    return(
        <Navbar id="menu1" className="lawnavbg" bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img 
                src={logo}
                width="140"
                className="logo" 
                alt="logo"  />
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
                    <Nav.Link onClick={handleLogout} href='#'>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BRNavbar
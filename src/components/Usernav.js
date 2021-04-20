import React from 'react'
import { Card, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Usernav = () => {
    return (
        <Card>
            <Nav className="flex-column">
                <h2>User Name</h2>
                <Nav.Item><Link to="/dashboard">Home</Link></Nav.Item>
                <Nav.Item><Link to="/dashboard/survey">Intake</Link></Nav.Item>
                <Nav.Item><Link to="/dashboard/account">My Account</Link></Nav.Item>
                <Nav.Item><Link to="/">Sign Out</Link></Nav.Item>
            </Nav>
        </Card>
    )
}

export default Usernav

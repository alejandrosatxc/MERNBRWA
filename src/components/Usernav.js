import React from 'react'
import { Card, Nav } from 'react-bootstrap'

const Usernav = () => {
    return (
        <Card>
            <Nav className="flex-column">
                <h2>User Name</h2>
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>My Account</Nav.Link>
                <Nav.Link>Sign Out</Nav.Link>
            </Nav>
        </Card>
    )
}

export default Usernav

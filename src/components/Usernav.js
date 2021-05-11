import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Nav, NavLink } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { logout } from '../actions/authActions'

const Usernav = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Card>
            <Nav className="flex-column">
                <h2>User Name</h2>
                <Nav.Item><Link to="/dashboard">Home</Link></Nav.Item>
                <Nav.Item><Link to="/dashboard/survey">Intake</Link></Nav.Item>
                <Nav.Item><Link to="/dashboard/account">My Account</Link></Nav.Item>
                <Nav.Item>
                    <NavLink onClick={handleLogout} href='/'>Logout</NavLink>
                </Nav.Item>
            </Nav>
        </Card>
    )
}

export default Usernav

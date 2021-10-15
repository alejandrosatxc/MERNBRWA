import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Tab, Tabs, Nav } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { logout } from '../actions/authActions'

const UserNav = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const username = user.firstName + ' ' + user.lastName

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Card>
            <Nav className="flex-column">
                <h2>{username}</h2>
                <Nav.Item><Link to="/myforms">My Forms</Link></Nav.Item>
                <Nav.Item><Link to="/mydocuments">My Documents</Link></Nav.Item>
                <Nav.Item><Link to="/account">Account</Link></Nav.Item>
                {user.role === "Admin"
                    ? <Nav.Item><Link to="/manageusers">Manage Users</Link></Nav.Item>
                    : null                   
                }
                {}
                <Nav.Item>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </Nav.Item>
            </Nav>
        </Card>
    )
}

export default UserNav

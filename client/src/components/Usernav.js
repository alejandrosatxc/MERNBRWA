import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Tab, Tabs } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { logout } from '../actions/authActions'
import UserForms from './UserForms'
import Useraccount from './Useraccount'
const Usernav = () => {
    const dispatch = useDispatch();
    const [activeComponent, setActiveComponet] = useState();
    const username = useSelector(state => state.auth.user.firstName + " " + state.auth.user.lastName)
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <Tabs variant="pills" defaultActiveKey="Userforms" id="userNav">
                <Tab eventKey="Userforms" title="My Forms">
                    <UserForms/>
                </Tab>
                <Tab eventKey="Userdocuments" title="MyDocuments">
                    <h1>User documents will render here</h1>
                </Tab>
                <Tab eventKey="Useraccount" title="Account">
                    <Useraccount/>
                </Tab>
                <Tab eventKey="Store" title="Store">
                    <h1>Store stuffs go here</h1>
                </Tab>
            </Tabs>
        </>
    )
}

export default Usernav

import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Portal from './Portal'
import Signup from './Signup'
import Reset from './Reset'

const Welcome = ({setToken}) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Portal setToken={setToken} />
                </Route>
                <Route path="/signup" component={Signup} />
                <Route path="/reset" component={Reset} />
            </Switch>
        </Router>        
    )
}

export default Welcome

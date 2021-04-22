import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
//import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/BRNavbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from './components/Login'

const setToken = (userToken) => {
  //call sessionStorage.setItem to save a user token into session storage
  //This allows it to persist in memory. Even when a user refreshes the page
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

const getToken = () => {
  //Look in sessionStorage, get an item called token
  const tokenString = sessionStorage.getItem('token');
  //Parse the JSON object
  const userToken = JSON.parse(tokenString);
  //Need to use optional chaining operator ?. which protects from reading 'undefined' 
  //upon first access
  return userToken?.token
}

function App() {

  const token = getToken();

  return (
    <Router>
      <BRNavbar/>
      <Container className="main-container">
        {/* token defines loggedin or logged out, show portal if loggedout, show dash if logged in */}
        {token
          ? <Route path="/" component={Dashboard} />
          : <Login setToken={setToken} /> 
        }
      </Container>       
      <Footer />
    </Router>
  );
}

export default App;

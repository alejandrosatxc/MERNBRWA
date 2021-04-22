import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
//import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/BRNavbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Portal from './components/Portal'
import Reset from './components/Reset'
import Resend from './components/Resend'
import Greeting from './components/Greeting'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Welcome from './components/Welcome'

function App() {

  const [token, setToken] = useState(false);
  
  return (
    <Router>
      <BRNavbar/>
      <Container className="main-container" fluid>
        {/* token defines loggedin or logged out, show portal if loggedout, show dash if logged in */}
        {token 
          ? <Dashboard /> 
          : <Welcome /> 
        }
      </Container>       
      <Footer />
    </Router>
  );
}

export default App;

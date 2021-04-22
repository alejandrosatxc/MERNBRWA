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
import Welcome from './components/Welcome'

function App() {

  const [token, setToken] = useState(false);
  
  return (
    <Router>
      <BRNavbar/>
      <Container className="main-container">
        {/* token defines loggedin or logged out, show portal if loggedout, show dash if logged in */}
        {token
          ? <Dashboard /> 
          : <Welcome setToken={setToken} /> 
        }
      </Container>       
      <Footer />
    </Router>
  );
}

export default App;

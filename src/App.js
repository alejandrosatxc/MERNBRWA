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
import Greeting from './components/Greeting'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {

  const [session, setSession] = useState('inactive')

  
  return (
    <Router>
      <BRNavbar/>
      <Container className="main-container" fluid>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Container>       
      <Footer />
      
    </Router>
  );
}

export default App;

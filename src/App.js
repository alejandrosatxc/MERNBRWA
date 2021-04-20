import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
//import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Portal from './components/Portal'
import Greeting from './components/Greeting'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {
  return (
    <Router>
      
        <BRNavbar/>
        <Container className="main-container" fluid>
        <Row>
          <Col>
            <Greeting />
          </Col>
          <Col>
            <Signin />
          </Col>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </Router>
  );
}

export default App;

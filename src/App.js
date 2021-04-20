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
        <Portal />       
        <Footer />
    </Router>
  );
}

export default App;

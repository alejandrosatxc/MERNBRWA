import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import useToken from './hooks/useToken'
//import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/BRNavbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from './components/Login'

function App() {

  const {token, setToken} = useToken();

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

import './App.css';
import { BrowserRouter as Router} from "react-router-dom";

import { useSelector } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useEffect } from 'react'
//import useToken from './hooks/useToken'
//import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/BRNavbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from './components/Login'

function App() {
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
      <Router>
        <BRNavbar/>
        <Container className="main-container">
          {/* token defines loggedin or logged out, show portal if loggedout, show dash if logged in */}
          {console.log(auth)}
          {auth,isAuthorized
            ? <Dashboard />
            : <Login />
          }
          {console.log(auth)}
        </Container>       
        <Footer />
      </Router>
  );
}

export default App;

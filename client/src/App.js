import './App.css';
import { BrowserRouter as Router} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
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

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser());
  });

  return (
      <Router>
        <BRNavbar/>
        <Container className="main-container">
          {/* token defines loggedin or logged out, show portal if loggedout, show dash if logged in */}
          {isAuthenticated
            ? <Dashboard />
            : <Login />
          }
        </Container>       
        <Footer />
      </Router>
  );
}
/*
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps
)(App);
*/
export default App
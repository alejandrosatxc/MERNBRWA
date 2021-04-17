import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import './css/custom.css';
//import './css/theme.css';

import BRNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <BRNavbar />
      <Dashboard />
      <Footer />
    </Router>
  );
}

export default App;

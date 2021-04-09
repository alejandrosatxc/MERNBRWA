import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/navbar.component";

function App() {
  return (
    <Router>
      
      <div className="container">
        <a id="start"></a>
          <Navbar />
      </div>
    </Router>
  );
}

export default App;

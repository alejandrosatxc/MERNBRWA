import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import Survey from './Survey'

const Dashboard = () => {


  return(
    <Survey/>
  );
}

export default Dashboard
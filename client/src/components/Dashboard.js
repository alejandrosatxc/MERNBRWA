import React, { useState, useEffect } from 'react';
import Survey from './Survey'
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import { useSelector } from 'react-redux';

import { Tabs, Tab, Card} from 'react-bootstrap'
import UserForms from './UserForms'

const Dashboard = () => {
  //TODO if intakes are complete, give user the option to review the last intake form they have submitted
  const userIntakeComplete = useSelector(state => state.auth.user.intake_complete)
  const surveyid = 1 //intake form
  const surveyMode = 'edit'

  

  //TODO check User.actve_forms for a surveyid of 1 where form_status = Complete
  return(
    <>
      {userIntakeComplete ?
      <Usernav/>
      : <Survey surveyid={surveyid} surveyMode={surveyMode}/>}
    </>
  );
}

export default Dashboard
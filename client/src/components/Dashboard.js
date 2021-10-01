import React from 'react';
import Survey from './Survey'
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  //TODO if intakes are complete, give user the option to review the last intake form they have submitted
  const userIntakeComplete = useSelector(state => state.auth.user.intake_complete)
  return(
    <>
      <Usernav/>
      {userIntakeComplete
        ? <Useraccount/>
        : <Survey/>}

    </>
  );
}

export default Dashboard
import React from 'react';
import Survey from './Survey'
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const userIntakeComplete = useSelector(state => state.auth.user.intake_complete)
  return(
    <>
      {userIntakeComplete
        ? <Useraccount/>
        : <Survey/>
      }
    </>
  );
}

export default Dashboard
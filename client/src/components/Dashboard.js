import React, { useEffect }from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom'
import Survey from './Survey'
import Document from './Document'
import UserNav from './UserNav'
import UserAccount from './UserAccount'
import UserForms from './UserForms';
import UserDocuments from './UserDocuments'
import ManageUsers from './ManageUsers'
import { useSelector } from 'react-redux';

const Dashboard = (props) => {
  //TODO if intakes are complete, give user the option to review the last intake form they have submitted
  const userIntakeComplete = useSelector(state => state.auth.user.intake_complete)
  const auth = useSelector(state => state.auth)
  const history = useHistory();
  const location = useLocation();

  //The dynamic form route will be set in the UserForms component via a click by the user

  useEffect(() => {
    if(!userIntakeComplete && auth.user.role === "Client" ) {
      history.push(`/form/1/edit/${auth.user.active_forms[0].form_id}`) //Force an intake survey
    }
  }, [auth.user, location.pathname]) //Only run when user logs/loads in or user tries to navigate away

  return(
    <>
      {(!userIntakeComplete && auth.user.role === "Client") ? null : <UserNav/>}
      <Route path="/myforms" component={UserForms} />
      <Route path="/mydocuments" component={UserDocuments} />
      <Route path="/account" component={UserAccount} />
      <Route path="/form/:surveyid/:surveyMode/:userSubmission_id" component={Survey} />
      <Route path="/document/:document_id" component={Document}/>
      {
        (auth.user.role === 'Admin')
        ? <Route path="/manageusers" component={ManageUsers} />
        : null
      }
    </>
  );
}

export default Dashboard
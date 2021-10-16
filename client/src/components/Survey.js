import React from 'react'
import * as Survey from "survey-react";
import 'bootstrap/dist/css/bootstrap.css';
import "survey-react/survey.css";
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
 
import { loadSurvey, loadUserResponses } from '../actions/formActions'

//TODO figure out how to do custom themeing 
//Survey.StylesManager.applyTheme("bootstrapmaterial");
//Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

//get a survey from mongoDB
const SurveyViewer = () => {
    

    const user = useSelector(state => state.auth.user)
    const survey = useSelector(state => state.form.survey)
    const userSubmission = useSelector(state => state.form.userSubmission)
    const dispatch = useDispatch();
    const { surveyid, surveyMode, userSubmission_id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadSurvey(surveyid)); //intake is the default for now
        dispatch(loadUserResponses(userSubmission_id)) //get resposes from a specific document _id
    }, []); //As of now passin an empty array to useEffect will cause
            //useEffect to only run on the initial render

    //TODO this needs to be a redux action and moved out of this component as such.
    function sendDataToServer(currentSurvey) {
        //send Ajax request to your web server.
        console.log("The results are:" + JSON.stringify(currentSurvey.data));
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const userid = user._id; //userid
        const data = currentSurvey.data; //The data that is to be sent to the server
        const surveyid = survey.surveyid;
   
        const body = JSON.stringify({data, userid, surveyid, userSubmission_id}); //send survey resposnses, userid, and the survey they completed

        axios.post('/api/surveys/submit', body, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        //TODO redirect on confirmation of surveydoc saved. could the response include a function with a timeout and redirect?
        //TODO fix garbage code here
        setTimeout(() => {
            if(user.role === 'Client' && surveyid === 1) {
                user.intake_complete = 1
                history.push('/myforms')
            } else if(user.role === 'Admin' && surveyid === 2) {
                history.push('/mydocuments')
            }
        }, 3000)       
    }
    //TODO add a check to see if user has completed a survey by id. If they have, (or partially completed), search for that 
    //survey by usurveyid, and set the survey fields to the data they have previously responded with.
    
    //TODO if user already has a survey complete DO NOT create a new one, UPDATE the old one. 
    return (
        <>
            {survey
                ? <Survey.Survey 
                    data={userSubmission ? userSubmission.userResponses : null/* Check if usurvey exists*/}
                    json={survey.surveyJSON}
                    onComplete={sendDataToServer} 
                    showPreviewBeforeComplete='showAnsweredQuestions'
                    completedHtml='Thank you for completing this form, a lawyer will review this information'
                    mode={surveyMode}/>
                : <h1>Surveyid: {surveyid} surveyMode: {surveyMode}</h1>
            }
        </> //TODO change the header to be link to send feedback/usage stats
            //Or make the no survey message a survey selection panel where the user
            //selects a survey to load from a list of surveys they have access to/purchased.
        
    )
}

export default SurveyViewer
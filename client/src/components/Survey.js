import React from 'react'
import * as Survey from "survey-react";
import 'bootstrap/dist/css/bootstrap.css';
import "survey-react/survey.css";
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 
import { loadSurvey, loadUserResponses } from '../actions/authActions'

//TODO figure out how to do custom themeing 
Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

//get a survey from mongoDB
const SurveyViewer = () => {
    

    const id = useSelector(state => state.auth.user._id)
    const survey = useSelector(state => state.auth.survey)
    const userSurveyData = useSelector(state => state.auth.userSurvey)
    const dispatch = useDispatch();
    const surveyid = 1; //TODO Fix this, causing a lot of problems when reading as null or undefined
    //const userSurvey = {surveyid, id}

    useEffect(() => {
        dispatch(loadSurvey(surveyid)); //intake is the default for now
        dispatch(loadUserResponses(surveyid, id)) //get resposes from intake matching with userid
    }, []); //As of now passin an empty array to useEffect will cause
            //useEffect to only run on the initial render

    //TODO this needs to be a redux action and moved out of this component as such.
    function sendDataToServer(currentSurvey, user) {
        //send Ajax request to your web server.
        console.log("The results are:" + JSON.stringify(survey.data));
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const _id = id; //userid
        const data = currentSurvey.data; //The data that is to be sent to the server
        const surveyid = survey.surveyid;

        const body = JSON.stringify({data, _id, surveyid}); //send survey resposnses, userid, and the survey they completed
        console.log(body);
        
        axios.post('/api/surveys/submit', body, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //TODO add a check to see if user has completed a survey by id. If they have, (or partially completed), search for that 
    //survey by usurveyid, and set the survey fields to the data they have previously responded with.
    
    //TODO if user already has a survey complete DO NOT create a new one, UPDATE the old one. 
    return (
        <>
            {survey
                ? <Survey.Survey 
                    data={userSurveyData ? userSurveyData.data : null/* Check if usurvey exists*/}
                    json={survey.survey}
                    onComplete={sendDataToServer} 
                    showPreviewBeforeComplete='showAnsweredQuestions'
                    completedHtml='Thank you for completing this form, a lawyer will review this information'/>
                : <h1>no surveyJSON</h1>
            }
        </> //TODO change the header to be link to send feedback/usage stats
            //Or make the no survey message a survey selection panel where the user
            //selects a survey to load from a list of surveys they have access to/purchased.
        
    )
}



export default SurveyViewer

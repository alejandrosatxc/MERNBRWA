import React from 'react'
import * as Survey from "survey-react";
import 'bootstrap/dist/css/bootstrap.css';
import "survey-react/survey.css";
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 
import { loadSurvey } from '../actions/authActions'

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

//get a survey from mongoDB
const SurveyViewer = () => {
    

    const id = useSelector(state => state.auth.user._id)
    const survey = useSelector(state => state.auth.survey)
    const dispatch = useDispatch();
    //const surveyJSON = survey.survey;

    useEffect(() => {
        dispatch(loadSurvey());
    }, []); //As of now passin an empty array to useEffect will cause
            //useEffect to only run on the initial render


    function sendDataToServer(currentSurvey, user) {
        //send Ajax request to your web server.
        console.log("The results are:" + JSON.stringify(survey.data));
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const _id = id; //userid
        const data = currentSurvey.data;
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

    return (
        <>
            {survey
                ? <Survey.Survey json={survey.survey} onComplete={sendDataToServer}/>
                : <h1>no surveyJSON</h1>
            }
        </> //TODO change the header to be link to send feedback/usage stats
            //Or make the no survey message a survey selection panel where the user
            //selects a survey to load from a list of surveys they have access to/purchased.
        
    )
}



export default SurveyViewer

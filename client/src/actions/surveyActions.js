import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    SURVEY_LOADING,
    SURVEY_LOADED,
    SURVEY_FAIL,
    USERSURVEY_LOADING,
    USERSURVEY_LOADED,
    USERSURVEY_FAIL
} from './types'


//Get survey
//TODO find a way to pass a surveyid to the loadSurvey function in order to
//allow different surveys to be loaded by surveyid. 
export const loadSurvey = (surveyid) => (dispatch) => {
    //Survey loading
    dispatch({ type: SURVEY_LOADING});

    axios.get('/api/surveys', {
        params : {
            surveyid //TODO default survey to get is the intake
        }
    }) // returns a promise
      .then(res => dispatch({
          type: SURVEY_LOADED,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
              type: SURVEY_FAIL
          });
      }); //i.e. if token is invalid

}

export const loadUserResponses = (surveyid, id) => (dispatch) => {

    //Loading User reposponses into survey
    dispatch({type: USERSURVEY_LOADING});

    axios.get('/api/surveys/usersurveys?surveyid='+surveyid+"&usurveyid="+id) //returns a promise
      .then(res => dispatch({
          type: USERSURVEY_LOADED,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.resposonse.data, err.response.status)); //TODO fix this shit
          dispatch({
              type: USERSURVEY_FAIL
          })
      })
}
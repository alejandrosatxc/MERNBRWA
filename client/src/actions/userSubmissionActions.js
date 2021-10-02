import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USERSUBMISSION_LOADING,
    USERSUBMISSION_LOADED,
    USERSUBMISSION_FAIL
} from './types'

export const loadUserResponses = (surveyid, id) => (dispatch) => {

    //Loading User reposponses into survey
    dispatch({type: USERSUBMISSION_LOADING});
    //TODO fix this so the URI here doesn't look so ugly. Use params? 
    axios.get('/api/surveys/usersubmissions?surveyid='+surveyid+"&usurveyid="+id) //returns a promise
      .then(res => dispatch({
          type: USERSUBMISSION_LOADED,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.resposonse.data, err.response.status)); //TODO fix this shit
          dispatch({
              type: USERSUBMISSION_FAIL
          })
      })
}
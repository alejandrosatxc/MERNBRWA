import React from 'react'
import { Card } from 'react-bootstrap'
import * as Survey from 'survey-react'
import { loadSurvey, loadUserResponses } from '../actions/formActions'

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

//This component will show a list of all form a user has completed
//and allow them to review thier submission
const UserForms = () => {

    const id = useSelector(state => state.auth.user._id)
    const survey = useSelector(state => state.form.survey)
    const userSubmission = useSelector(state => state.form.userSubmission)
    const dispatch = useDispatch();
    const surveyid = 1;

    useEffect(() => {
        dispatch(loadSurvey(surveyid)); //intake is the default for now
        dispatch(loadUserResponses(surveyid, id)) //get resposes from intake matching with userid
    }, []);

    return(
        <Card>
            <Survey.Survey
                data={userSubmission ? userSubmission.userResponses: null}
                json={survey.surveyJSON}
                mode='display'
            />
        </Card>
    )
}

export default UserForms
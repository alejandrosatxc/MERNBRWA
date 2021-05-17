import React from 'react'
import * as Survey from "survey-react";
import 'bootstrap/dist/css/bootstrap.css';
import "survey-react/survey.css";
import axios from 'axios'
import { useSelector } from 'react-redux'
 
Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var surveyJSON = {"pages":[{"name":"intake","elements":[{"type":"text","name":"referral","title":"How did you hear about our law firm?"},{"type":"multipletext","name":"legal_name","title":"Please list your full legal name.","items":[{"name":"first_name","isRequired":true,"title":"First Name"},{"name":"middle_name","title":"Middle Name"},{"name":"last_name","isRequired":true,"title":"Last Name"},{"name":"suffix","title":"Suffix"}]}],"title":"New Client Intake","description":"Thank you for selecting our firm to help you with your legal needs. Please fill out the information below, so that we can add you to our system."},{"name":"contact details","elements":[{"type":"text","name":"email","title":"Email Address","isRequired":true,"inputType":"email"},{"type":"text","name":"phone","title":"Phone Number","isRequired":true,"inputType":"tel","maxLength":13},{"type":"panel","name":"address","elements":[{"type":"text","name":"street","title":"Street","isRequired":true},{"type":"text","name":"street2","title":"Street line 2"},{"type":"text","name":"city","title":"City","isRequired":true},{"type":"text","name":"state","startWithNewLine":false,"title":"State","isRequired":true},{"type":"text","name":"zip","startWithNewLine":false,"title":"Zip","isRequired":true}],"title":"Address"}]},{"name":"personal details","elements":[{"type":"text","name":"dob","title":"Date of Birth","isRequired":true,"inputType":"date"},{"type":"radiogroup","name":"citizen","title":"Are you a US Citizen?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}],"hasOther":true},{"type":"radiogroup","name":"military","title":"Have you ever served in the military?","isRequired":true,"choices":[{"value":"1","text":"Yes - Currently Serving"},{"value":"2","text":"Yes - Retired or Separated from serving"},{"value":"3","text":"No"}],"hasOther":true}]},{"name":"emergency contact","elements":[{"type":"multipletext","name":"emergency_contact","title":"Emergency Contact","items":[{"name":"first_name","isRequired":true,"title":"First Name"},{"name":"middle_name","title":"Middle Name"},{"name":"last_name","isRequired":true,"title":"Last Name"},{"name":"suffix","title":"Suffix"},{"name":"relationship","isRequired":true,"title":"Relationship to You"},{"name":"e_phone","isRequired":true,"inputType":"tel","title":"Phone Number"}]}]},{"name":"case type","elements":[{"type":"radiogroup","name":"case_type","title":"Type of Case:","isRequired":true,"commentText":"helo","choices":[{"value":"1","text":"Life and Estate Planning"},{"value":"2","text":"Divorce without Children"},{"value":"3","text":"Divorce with Children"},{"value":"4","text":"Child Custody or Support"}],"hasOther":true,"otherText":"Other Non-Family Law Matter"}]},{"name":"life and estate","elements":[{"type":"radiogroup","name":"last_will","title":"Do you want a Last Will and Testament?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"checkbox","name":"additional_documents","title":"What other documents would you like prepared? (leave blank if none)","choices":[{"value":"1","text":"Appointment for Disposition of Remains"},{"value":"2","text":"Directive to Physicians and Family ( Advanced Directive)"},{"value":"3","text":"HIPAA Release"},{"value":"4","text":"Statutory Durable Power of Attorney"},{"value":"5","text":"Declaration of Guardian for Minor Children"}]},{"type":"radiogroup","name":"married","title":"Are you Married?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"text","name":"number_children","title":"How many children do you have?","isRequired":true,"inputType":"number","min":"0","max":"20"}],"visibleIf":"{case_type} = 1","title":"Life and Estate Planning","description":"Go to www.bellripper.com/lifeandestateplanning to see an explanation of the documents listed below.\n"},{"name":"marriage details","elements":[{"type":"radiogroup","name":"texas_residency","title":"How long have you lived in Texas?","isRequired":true,"choices":[{"value":"1","text":"Less than 6 months"},{"value":"2","text":"More than 6 months"},{"value":"3","text":"I don't live in Texas"}]},{"type":"text","name":"county","title":"County of Residence","isRequired":true},{"type":"radiogroup","name":"county_residency","title":"How long have you resided in the above stated County?","description":"Note regarding residency: If you or your spouse have not lived in Texas for at least 6 months, then you may not be able to file for divorce in Texas. If you have not lived in your current County of residence for at least 60 days, then we need to determine which County to file in. Please contact our office if either of these timelines effect you and your case.","isRequired":true,"choices":[{"value":"1","text":"Less than 60 days"},{"value":"2","text":"More than 60 days"}]},{"type":"text","name":"marriage_date","title":"Date of Marriage","isRequired":true,"inputType":"date","inputFormat":"dd/mm/yyyy"},{"type":"text","name":"separation_date","title":"Date of Separation","isRequired":true,"inputType":"date","inputFormat":"dd/mm/yyyy"}],"visibleIf":"{case_type} = 2 or {case_type} = 3 or {case_type} = 4"},{"name":"id","elements":[{"type":"text","name":"dl_last3","title":"Last 3 digits of your driver's license number","isRequired":true,"inputType":"number","min":"3","max":"3"},{"type":"text","name":"dl_state","title":"What state issued your drivers license?","isRequired":true},{"type":"text","name":"ssn_last3","title":"Last 3 digits of your Social Security Number?","inputType":"number","min":"3","max":"3"}],"visibleIf":"{case_type} = 2 or {case_type} = 3 or {case_type} = 4"},{"name":"aliases","elements":[{"type":"matrixdynamic","name":"question9","title":"If you have any other aliases, please list them below","columns":[{"name":"Alias Names (if any)","cellType":"text"}],"choices":[1,2,3,4,5],"rowCount":1,"maxRowCount":5,"addRowText":"Add alias","removeRowText":"Remove alias"}],"visibleIf":"{case_type} = 2 or {case_type} = 3 or {case_type} = 4"},{"name":"other details","elements":[{"type":"radiogroup","name":"name-change","title":"Do you want a name change?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"radiogroup","name":"protective-order","title":"Do you want a Protective Order","choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"radiogroup","name":"employed","title":"Are you Employed?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]}],"visibleIf":"{case_type} = 2 or {case_type} = 3 or {case_type} = 4"},{"name":"other party","elements":[{"type":"panel","name":"panel1","elements":[{"type":"multipletext","name":"other_legal_name","title":"Legal Name","items":[{"name":"first_name","title":"First Name"},{"name":"middle_name","title":"Middle Name"},{"name":"last_name","title":"Last Name"},{"name":"suffix","title":"Suffix"}]},{"type":"multipletext","name":"other_address","title":"Address","items":[{"name":"other_street","title":"Street"},{"name":"other_street2","title":"Street line 2"},{"name":"other_city","title":"City"},{"name":"other_state","title":"State"},{"name":"other_zip","title":"Zip"},{"name":"other_county","title":"County of Residence"}]},{"type":"text","name":"other_email","title":"Email Address","inputType":"email"},{"type":"text","name":"other_phone","title":"Phone number"},{"type":"radiogroup","name":"other_employed","title":"Is the Other Party employed?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"radiogroup","name":"other_attorney","title":"Is there Other Party represented by an attorney?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]},{"type":"panel","name":"other_attorney_info","elements":[{"type":"text","name":"other_attorney-name","title":"Name of Other Party's Attorney"},{"type":"text","name":"other_attorney-phone","title":"Other Party's attorney's phone number"},{"type":"text","name":"other_attorney-email","title":"Other Party's attorney's email address"},{"type":"matrix","name":"other_attorney-info","title":"Indicate if the Other Party's attorney has:\n","columns":[{"value":"true","text":"Yes"},{"value":"false","text":"No"},{"value":"null","text":"I don't know"}],"rows":[{"value":"q1","text":"Represented Other Party in other matters (besides this case)?"},{"value":"q2","text":"Provided advice or other services to you regarding this case?"},{"value":"q3","text":"Provided advice or other services to you regarding other matters?"},{"value":"q4","text":"Talked with you in person or by telephone regarding this case?"},{"value":"q5","text":"Sent a letter, email, or other written communications to you related to this case? (We will needs copies of this correspondence.)"},{"value":"q6","text":"Served papers upon you in this case?"}]}],"visible":false,"visibleIf":"{other_attorney} = true","title":"Other Party's attorney information"},{"type":"radiogroup","name":"serve_location","title":"Where would you like the other party served with the suit?","choices":[{"value":"1","text":"Home Address"},{"value":"2","text":"Work Address"}]},{"type":"radiogroup","name":"separate_property","title":"Do you or the other party have separate property?","isRequired":true,"choices":[{"value":"true","text":"Yes"},{"value":"false","text":"No"}]}]}],"visibleIf":"{case_type} = 2 or {case_type} = 3 or {case_type} = 4"},{"name":"children names","elements":[{"type":"matrixdynamic","name":"children","visibleIf":"{case_type} = 3","title":"Please list the full legal name, date of birth, gender, and last 3 digits of their social security number for each of your children.","columns":[{"name":"first_name","title":"First Name","cellType":"text"},{"name":"middle_name","title":"Middle Name","cellType":"text"},{"name":"last_name","title":"Last Name","cellType":"text"},{"name":"suffix","title":"Suffix","cellType":"text"},{"name":"child_dob","title":"Date of Birth","cellType":"datepicker"},{"name":"gender","title":"Gender","cellType":"radiogroup","isRequired":true,"choices":[{"value":"male","text":"Male"},{"value":"female","text":"Female"},{"value":"other","text":"Other"}]},{"name":"child_ssn_last3","title":"Last 3 SSN","cellType":"text","isRequired":true,"width":"3"}],"choices":[1,2,3,4,5],"rowCount":1,"minRowCount":1,"maxRowCount":12}],"visibleIf":"{case_type} = 3 or {case_type} = 4"},{"name":"other","elements":[{"type":"text","name":"other-issue","title":"Tell us more about your issue or case:","isRequired":true}],"visibleIf":"{case_type} = 'other'"}]}

const SurveyViewer = () => {

    const id = useSelector(state => state.auth.user._id)

    function sendDataToServer(survey, user) {
        //send Ajax request to your web server.
        console.log("The results are:" + JSON.stringify(survey.data));
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const _id = id;
        const data = survey.data
        const body = JSON.stringify({data, _id});
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
            <Survey.Survey json={surveyJSON} onComplete={sendDataToServer}/>
        </>
        
    )
}



export default SurveyViewer

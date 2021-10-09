//const router = require('express').Router();
const express = require('express');
const router = express.Router();

//Survey Model
let Survey = require('../../models/surveys.model');
let userSubmission = require('../../models/usersubmissions.model');
let User = require('../../models/users.model');
const auth = require('../../middleware/auth');



// @route   GET /api/surveys/
// @desc    Get a Survey from DB
// @access  Private

//router.route('/').get((req, res) => {
router.get('/', (req, res) => {
    //Use params from get request
    const surveyid = req.query.surveyid;
    
    //simple backend validation
    if(!surveyid) {
        return res.status(400).json({msg: "surveyid not specified"});
    }

    //Find a survey by the provided id
    Survey.findOne({ surveyid })
        .then(survey => res.json(survey)) //return the entire survey doc
        .catch(err => res.status(400).json("Error: Survey does not exist" + err));
});

// @router  GET /api/surveys/usersubmissions
// @desc    Get a userSubmission from DB
// @access  Private

router.get('/usersubmissions', (req, res) => {
    //Use params from GET request
    const usurveyid = req.query.usurveyid;
    const surveyid = req.query.surveyid;
    const request = JSON.stringify(req.query);

    //simple backend validation
    if(!surveyid || !usurveyid) {
        return res.status(400).json({msg: "surveyid or usurveyid not specified" + surveyid });
    }
    
    //Find a userSubmission by the provided ID's
    userSubmission.findOne({usurveyid, surveyid})
        .then(userSubmission => res.json(userSubmission)) //return the users survey responses
        .catch(err => res.status(400).json("Error: userSubmission does not exist" + err));
})

// @router  GET /api/surveys/add
// @desc    Add a new survey to the database
// @access Private

router.post('/add', auth, (req, res) => {

    const surveyid = Number(req.body.surveyid);
    const name = req.body.name;
    const description = req.body.description;
    const cost = Number(req.body.cost);

    const newSurvey = new Survey({surveyid, name, description, cost});

    newSurvey.save()
        .then(() => res.json('Survey added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @router  GET /api/surveys/submit
// @desc    Submit userResponses to the server
// @access  Private

router.route('/submit').post((req, res) => {

    const mailgun = require("mailgun-js");
    const DOMAIN = 'portal.bellripper.com'; 
    const mg = mailgun({apiKey: "91dc585d7ea62bbce58e9a3e002a8f81-6ae2ecad-f03fc7ac", domain: DOMAIN});

    const userResponses = req.body.data;
    const usurveyid = req.body.userid;
    const active = 1;
    const form_status = "complete" //TODO for now default to complete, later check for unfinished or not started forms
    const surveyid = req.body.surveyid;
    //TODO add logic for UPDATING an existing userSubmission
    const newUserSubmission = new userSubmission({userResponses, usurveyid, active, form_status, surveyid})
    //Send mailgun email to ana containing the results of userResponses 
    surveyData = JSON.stringify(userResponses, null, 2);

    firstName = "<tr><td>First Name</td><td>" + userResponses.legal_name.first_name + "</td></tr>"
    lastName = "<tr><td>Last Name</td><td>" + userResponses.legal_name.last_name + "</td></tr>"
    email = "<tr><td>Email</td><td>" + userResponses.email + "</td></tr>"
    phone = "<tr><td>Phone</td><td>" + userResponses.phone + "</td></tr>"
    street = "<tr><td>Street</td><td>" + userResponses.street + "</td></tr>"
    city = "<tr><td>City</td><td>" + userResponses.city + "</td></tr>"
    state = "<tr><td>State</td><td>" + userResponses.state + "</td></tr>"
    zip = "<tr><td>Zip</td><td>" + userResponses.zip + "</td></tr>"
    surveyhtml = firstName + lastName + email + phone + street + city + state + zip
    surveyhtml = "<table>" + surveyhtml + "</table>"
    surveyhtml = "<h1>A new client has completed an intake form</h1>" + surveyhtml


    const emailData = {
        from: 'BRWebApp <admin@bellripper.com>',
        to: 'ana@bellripper.com',
        subject: 'New Client Intake',
        html: surveyhtml
    };

    newUserSubmission.save()
        .then(() => {
            res.json('User survey added!');
            if(surveyid === 1) { //If survey was intake, update intake_complete field and user doc
                User.findByIdAndUpdate(usurveyid, {
                        "intake_complete" : 1,
                        "address" : userResponses.street,
                        "city" : userResponses.city,
                        "state" : userResponses.state,
                        "zip" : userResponses.zip,
                        "phone" : userResponses.phone,
                        "citizen" : userResponses.citizen,
                        "dob" : userResponses.dob,
                        "emergency_name" : userResponses.emergency_contact.first_name + " " + userResponses.emergency_contact.last_name,
                        "emergency_phone" : userResponses.emergency_contact.e_phone,
                        "emergency_relationship" : userResponses.emergency_contact.relationship,
                        $push : {"active_forms" : { form_id : newUserSubmission._id, surveyid: surveyid}} //add completed form to user's list of active forms      
                    },
                    (res, err) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log("Updated user intake_complete! for user: " + usurveyid)
                        }
                    })
            }
            mg.messages().send(emailData, function (error, body) {
                console.log(body);
                console.log(error);
            });
        })
        .catch(err => res.status(400).json('userResponses received: ' + JSON.stringify(newUserSubmission) + '\nError: ' + err));    
}) 

module.exports = router;
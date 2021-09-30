//const router = require('express').Router();
const express = require('express');
const router = express.Router();

//Survey Model
let Survey = require('../../models/surveys.model');
let userSurvey = require('../../models/usersurveys.model');
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

//Add a new survey to the database
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

router.route('/submit').post((req, res) => {

    const mailgun = require("mailgun-js");
    const DOMAIN = 'portal.bellripper.com'; 
    const mg = mailgun({apiKey: "91dc585d7ea62bbce58e9a3e002a8f81-6ae2ecad-f03fc7ac", domain: DOMAIN});

    const data = req.body.data;
    const usurveyid = req.body._id;
    const active = 1;
    const surveyid = req.body.surveyid;

    const newUserSurvey = new userSurvey({data, usurveyid, active, surveyid})
    //Send mailgun email to ana containing the results of that data 
    surveyData = JSON.stringify(data, null, 2);

    firstName = "<tr><td>First Name</td><td>" + data.legal_name.first_name + "</td></tr>"
    lastName = "<tr><td>Last Name</td><td>" + data.legal_name.last_name + "</td></tr>"
    email = "<tr><td>Email</td><td>" + data.email + "</td></tr>"
    phone = "<tr><td>Phone</td><td>" + data.phone + "</td></tr>"
    street = "<tr><td>Street</td><td>" + data.street + "</td></tr>"
    city = "<tr><td>City</td><td>" + data.city + "</td></tr>"
    state = "<tr><td>State</td><td>" + data.state + "</td></tr>"
    zip = "<tr><td>Zip</td><td>" + data.zip + "</td></tr>"
    surveyhtml = firstName + lastName + email + phone + street + city + state + zip
    surveyhtml = "<table>" + surveyhtml + "</table>"
    surveyhtml = "<h1>A new client has completed an intake form</h1>" + surveyhtml


    const emailData = {
        from: 'BRWebApp <admin@bellripper.com>',
        to: 'alejandro@satxconsultants.com',
        subject: 'New Client Intake',
        html: surveyhtml
    };

    newUserSurvey.save()
        .then(() => {
            res.json('User survey added!');
            if(surveyid === 1) { //If survey was intake, update intake_complete field
                User.findByIdAndUpdate(usurveyid, {"intake_complete" : 1},
                    (res, err) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log("Updated user intake_complete!")
                        }
                    })
            }
            mg.messages().send(emailData, function (error, body) {
                console.log(body);
                console.log(error);
            });
        })
        .catch(err => res.status(400).json('Data received: ' + JSON.stringify(newUserSurvey) + '\nError: ' + err));    
}) 

module.exports = router;
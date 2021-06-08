const router = require('express').Router();
let Survey = require('../../models/surveys.model');
let userSurvey = require('../../models/usersurveys.model');
const auth = require('../../middleware/auth');


router.route('/').get((req, res) => {
    Survey.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post(auth, (req, res) => {
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
    const surveyid = 1;

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
        to: 'ana@bellripper.com',
        subject: 'New Client Intake',
        html: surveyhtml
    };

    newUserSurvey.save()
        .then(() => {
            res.json('User survey added!');
            mg.messages().send(emailData, function (error, body) {
                console.log(body);
                console.log(error);
            });
        })
        .catch(err => res.status(400).json('Data received: ' + JSON.stringify(newUserSurvey) + '\nError: ' + err));
}) 

module.exports = router;
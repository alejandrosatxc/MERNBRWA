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
    surveyData = JSON.stringify(data);
    
    const emailData = {
        from: 'BRWebApp <admin@bellripper.com>',
        to: 'alejandro@satxconsultants.com',
        subject: 'New Client Intake',
        text: surveyData
    };

    newUserSurvey.save()
        .then(() => {
            res.json('User survey added!');
            mg.messages().send(emailData, function (error, body) {
                console.log(body);
                console.log(error);
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
}) 

module.exports = router;
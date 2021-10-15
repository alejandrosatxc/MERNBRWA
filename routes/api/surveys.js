//const router = require('express').Router();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); //for casting to object id mongoose.Types.ObjectId()


//Survey Model
let Survey = require('../../models/surveys.model');
let userSubmission = require('../../models/usersubmissions.model');
let User = require('../../models/users.model');
let Document = require('../../models/userdocuments.models');
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
    //const usurveyid = req.query.usurveyid;
    //const surveyid = req.query.surveyid;
    const _id = req.query._id
    const request = JSON.stringify(req.query);

    //simple backend validation
    if(!_id) {
        return res.status(400).json({msg: "Unique document _id not specified" + _id });
    }
    
    //Find a userSubmission by the provided ID's
    userSubmission.findOne({_id})
        .then(userSubmission => res.json(userSubmission)) //return the users survey responses
        .catch(err => res.status(400).json("Error: userSubmission: " + _id + " does not exist" + err));
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
    const surveyid = req.body.surveyid;
    const userSubmission_id = mongoose.Types.ObjectId(req.body.userSubmission_id);
    //const active = 1;
    const form_status = "complete" //TODO for now default to complete, later check for unfinished or not started forms
    //TODO add logic for UPDATING an existing userSubmission
    // userSubmission.countDocuments({_id : })
    //const newUserSubmission = new userSubmission({userResponses, usurveyid, active, form_status, surveyid})
    //Send mailgun email to ana containing the results of userResponses 
    surveyData = JSON.stringify(userResponses, null, 2);
    
    userSubmission.findByIdAndUpdate({_id : userSubmission_id}, {
        userResponses : userResponses,
        form_status : "complete"
    })
        .then(() => {
            if(surveyid === 1) { //If survey was intake, update intake_complete field and user doc, ADD attorney form to admin
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
                        //TODO update form_status for every submission
                        /*$push : {"active_forms" : { 
                            form_id : newUserSubmission._id,
                            surveyid: surveyid,
                            form_status: form_status
                            }
                        }*/ //add completed form to user's list of active forms      
                    },
                    (res, err) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log("Updated user intake_complete! for user: " + usurveyid)
                        }
                    }
                )
                //Serve an attorney form to the Admin (Ana)
                const attorneyForm = new userSubmission({
                    surveyid : 2,
                    usurveyid : "6167616de9a3793f62eb325e", //Admin id
                    form_status : "new",
                    userResponses : null,
                    active : 1
                })

                //Create an empty attorney form in db
                attorneyForm.save()
                    .then(() => {
                        User.findByIdAndUpdate("6167616de9a3793f62eb325e", { //This ID is for admin
                            $push : {"active_forms" : {
                                form_id: attorneyForm._id, //
                                userform_id : userSubmission_id, //For which user
                                user_name: userResponses.legal_name.first_name + " " + userResponses.legal_name.last_name,
                                surveyid: 2,
                                form_status: "new"
                            }}
                        },
                        (res, err) => {
                            if(err) {
                                console.log(err)
                            } else {
                                console.log("Assigned Attorney Form to admin " + attorneyForm._id)
                            }
                        })
                    })
                    .catch((err) => console.log(err + " :Some error occurred"))
                //Create email to send to admin
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
                }
                
                mg.messages().send(emailData, function (error, body) {
                    console.log(body)
                    console.log(error)
                })

                res.json('User survey updated!');

            } else if (surveyid === 2) { //If attorney form, create LOR
                //TODO FIX THIS GOT DAMN SPAGHETTI
                var intakeid = ''
                //Get corresponding intake form id
                User.findById({_id: '6167616de9a3793f62eb325e'}) //Get admin
                    .then((user) => {
                        user.active_forms.forEach((form) => {
                            if(form.form_id.equals(userSubmission_id)) {
                                intakeid = form.userform_id
                            }
                        })
                    })
                    .then(() => {
                        //fetch intake responses
                        userSubmission.findById({_id: intakeid})
                            .then((userSubmission) => {
                                const intake_responses = userSubmission.userResponses
                                //combine intake and attorneyy form responses
                                let fieldsForLOR = {
                                    ...intake_responses,
                                    ...userResponses
                                }
                                //Create new document using the fields from both intake and attorney form
                                const LOR = new Document ({
                                    uuid: usurveyid, //admins id
                                    fields: fieldsForLOR
                                })
                                //Save document to db
                                LOR.save()
                                    .then(() => {
                                        //Update admins list of documents
                                        User.findByIdAndUpdate("6167616de9a3793f62eb325e", { //
                                            $push : { "user_documents" : {
                                                udoc_id: LOR._id,
                                                name: "Letters of Representation"
                                            }}
                                        }, (res, err) => {
                                            if(err) {
                                                console.log("error here " + err)
                                            } else {
                                                console.log("result here" + res)
                                            }
                                        })
                                })                   
                            })
                    })
                    .catch((err) => {
                        console.log("shit, here's an error" + err)
                        //res.status(400).json("We are triggering this! intake not found")
                    })
            }
        })
        .catch(err => res.status(400).json('userResponses received: ' + JSON.stringify(userResponses) + '\nError: ' + err));    
}) 

module.exports = router;
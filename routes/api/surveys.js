//const router = require('express').Router();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); //for casting to object id mongoose.Types.ObjectId()
const axios = require('axios')

require('dotenv').config()
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

    //Find a survey by the provided surveyid
    Survey.findOne({ surveyid })
        .then(survey => res.json(survey)) //return the entire survey doc
        .catch(err => res.status(400).json("Error: Survey does not exist" + err));
});

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

    const userResponses = req.body.data;
    const usurveyid = req.body.userid;
    const surveyid = req.body.surveyid;
    const userSubmission_id = mongoose.Types.ObjectId(req.body.userSubmission_id);
    //const active = 1;
    const form_status = "complete" //TODO for now default to complete, later check for unfinished or not started forms
    //TODO add logic for UPDATING an existing userSubmission
    surveyData = JSON.stringify(userResponses, null, 2);
    
    userSubmission.findByIdAndUpdate({_id : userSubmission_id}, {
        userResponses : userResponses,
        form_status : "complete"
    })
        .then(() => {
            if(surveyid === 1) { //If survey was intake, update intake_complete field and user doc, ADD attorney form to admin
                processIntakeForm(userResponses, usurveyid, userSubmission_id)
                sendEmail(userResponses, 'ana@bellripper.com')
                res.json('User survey updated!');
            } else if (surveyid === 2) { //If attorney form, create LOR
                processAttorneyForm(userSubmission_id, usurveyid, userResponses)
                res.json('Attorney form processed!')
            }
        })
        .catch(err => res.status(400).json('userResponses received: ' + JSON.stringify(userResponses) + '\nError: ' + err));    
}) 

const sendEmail = (userResponses, toEmailAddress) => {

    const mailgun = require("mailgun-js");
    const DOMAIN = 'portal.bellripper.com'; 
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

    //Create email to send to admin
    firstName = "<tr><td>First Name</td><td>" + userResponses.legalName.firstName + "</td></tr>"
    lastName = "<tr><td>Last Name</td><td>" + userResponses.legalName.lastName + "</td></tr>"
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
        to: toEmailAddress,
        subject: 'New Client Intake',
        html: surveyhtml
    }
    
    mg.messages().send(emailData, function (error, body) {
        //console.log(body)
        //console.log(error)
    })
}

const processIntakeForm = (userResponses, usurveyid, userSubmission_id) => {

    User.findByIdAndUpdate(usurveyid, {
        "intake_complete" : 1,
        "address" : userResponses.street,
        "city" : userResponses.city,
        "state" : userResponses.state,
        "zip" : userResponses.zip,
        "phone" : userResponses.phone,
        "citizen" : userResponses.citizen,
        "dateOfBirth" : userResponses.dateOfBirth,
        "emergencyContact" : {
            "firstName" : userResponses.emergencyContact.firstName,
            "lastName" : userResponses.emergencyContact.lastName,
            "relationship" : userResponses.emergencyContact.relationship,
            "phone" : userResponses.emergencyContact.emergencyPhone
        }
    },
    (res, err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Updated user intake_complete! for user: " + usurveyid)
        }
    })

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
                user_name: userResponses.legalName.firstName + " " + userResponses.legalName.lastName,
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

    //Create a new contact in Clio

    const config = {
        headers: { 
            'Authorization' : `Bearer ${process.env.CLIO_ACCESS_TOKEN}`,
            'Content-Type' : 'application/json'
        }

    }

    //TODO figure out how to handle whether or not legalName.middleName exists
    const clioData = {"data" : {
		"first_name" : userResponses.legalName.firstName,
		"last_name" : userResponses.legalName.lastName,
		"type" : "Person",
		"addresses" : [{
			"name" : "Home",
			"street" : userResponses.street,
			"city" : userResponses.city,
			"province" : userResponses.state,
			"postal_code" : userResponses.zip,
			"country" : "USA"
		}],
		"email_addresses" : [{
			"address" : userResponses.email,
			"name" : "Home",
			"primary" : true
		}],
        "phone_numbers" : [{
            "name" : "Home",
            "number" : userResponses.phone,
            "default_number" : true
        }]
	}}

    axios.post('https://app.clio.com/api/v4/contacts.json', clioData, config)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data.error))

    //TODO error check and then send email
}

const processAttorneyForm = async (attorneyForm_id, usurveyid, userResponses) => {

    let Document = require('../../models/userdocuments.models');
    //Using the attorney form _id, Find the coressponding intake form _id 
    const intakeid = await User.findById({ _id: '6167616de9a3793f62eb325e'}) //admin id
        .then(admin => admin.active_forms.find(form => form.form_id.equals(attorneyForm_id)).userform_id)
        .catch(err => console.log("Error admin not found " + err))
    //Get the userResponses from the corressponding intake form 
    const intake_responses = await userSubmission.findById({ _id: intakeid})
        .then(userSubmission => userSubmission.userResponses)
        .catch(err => console.log("Error userSubmission not found " + err))

    //For username
    const username = Object.values(intake_responses.legalName).join(' ')
    
    //Autofill LOR template
    let requests = [
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.legalName}}',
                    matchCase: true,
                },
                replaceText: username,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.street}}',
                    matchCase: true,
                },
                replaceText: intake_responses.street,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.city}}',
                    matchCase: true,
                },
                replaceText: intake_responses.city,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.state}}',
                    matchCase: true,
                },
                replaceText: intake_responses.state,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.zip}}',
                    matchCase: true,
                },
                replaceText: String(intake_responses.zip)
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.email}}',
                    matchCase: true,
                },
                replaceText: intake_responses.email,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{client.firstName}}',
                    matchCase: true,
                },
                replaceText: intake_responses.legalName.firstName,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{Matter.legalService}}',
                    matchCase: true,
                },
                replaceText: userResponses.repStatement,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{attorney.name}}',
                    matchCase: true,
                },
                replaceText: 'Hilary Bell',
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{attorney.email}}',
                    matchCase: true,
                },
                replaceText: 'hilary@bellripper.com',
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{flatfee}}',
                    matchCase: true,
                },
                replaceText: "$" + String(userResponses.totalFee),
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{repAmount}}',
                    matchCase: true,
                },
                replaceText: "$" + String(userResponses.repAmount),
            },
        },
    ]
    var LOR_title = username + " Letters of Representation"

    const { google } = require("googleapis")

    const auth = new google.auth.GoogleAuth({
        keyFile : "credentials.json",
        scopes : [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/documents"
        ] 
    })

    //Creat client instance for auth
    const client = await auth.getClient()
    const documentId = '1SeFPhxCIG1BZHWG_wg_7V3r-XV5WPHt7xav-gEpxuJk'
    // Instance of Google Sheets and Drive API
    const gDrive = google.drive({version: "v3", auth: client})
    const gDocs = google.docs({ version: "v1", auth: client})
    //Copy the LOR template, store the copy in folder ID defined by 'parents'
    const templateLOR = await gDrive.files.copy({auth, name: LOR_title, parents: ['1Udp0lDeFekP-N3xG_pIjnC6B14lHnXAR'], fileId: documentId})
    //Autofill fields in the newly created document
    const result = await gDocs.documents.batchUpdate(
        {
            documentId : templateLOR.data.id,
            resource: {
                requests
            }
        })
        .then(res => {
            //console.log(res.data)
            return res
        })
        .catch(err => console.log('The API returned an error: ' + err))

    //Create new document in mongoDB using the userResponses from both attorney form and corressponding attorney form
    const LOR = new Document ({
        uuid: usurveyid, //admins id
        googleDocId: result.data.documentId,
        fields: {
            intakeForm : intake_responses,
            attorneyForm :  userResponses
        }
    })

    //Save document to DB
    LOR.save()
        .then(() => {
            //Update admins list of documents
            User.findByIdAndUpdate("6167616de9a3793f62eb325e", { //admin id
                $push : { "user_documents" : {
                    googleDocId: result.data.documentId,
                    udoc_id: LOR._id,
                    name: "Letters of Representation",
                    username: username
                }}
            }, (res, err) => {
                if(err) {
                    console.log("error here " + err) //this is being printed as if it's returning an error
                } else {
                    console.log("result here" + res)
                }
            })
        })
}

module.exports = router;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSubmissionSchema = new Schema({
    usurveyid: { type: String, default: null },
    //userid: { type: String, required: true, default: null },
    surveyid: { type: String, required: true, default: null},
    //paid: { type: String, required: true, default: null},
    //status: { type: String, required: true, default: null},
    //startdate: { type: Date, required: true, default: null},
    //finaldate: { type: Date, required: true, default: null},
    userResponses: { type: Object, required: false, default: null}, //The type might have to be JSON? 
    active: { type: String, required: true, default: null},
    form_status: {type: String, required: true, default: "Incomplete"}
    }, {
        timestamps: true
    });

const userSubmission = mongoose.model('userSubmission', userSubmissionSchema);

module.exports = userSubmission;
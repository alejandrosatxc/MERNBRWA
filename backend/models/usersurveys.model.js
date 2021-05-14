const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSurveySchema = new Schema({
    usurveyid: { type: String, default: null },
    //userid: { type: String, required: true, default: null },
    surveyid: { type: String, required: true, default: null},
    //paid: { type: String, required: true, default: null},
    //status: { type: String, required: true, default: null},
    //startdate: { type: Date, required: true, default: null},
    //finaldate: { type: Date, required: true, default: null},
    data: { type: Object, required: true, default: null}, //The type might have to be JSON? 
    active: { type: String, required: true, default: null},

});

const userSurvey = mongoose.model('userSurvey', userSurveySchema);

module.exports = userSurvey;
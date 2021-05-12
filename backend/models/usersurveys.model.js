const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSurveysSchema = new Schema({
    usurveyid: { type: String, required: true, default: null },
    userid: { type: String, required: true, default: null },
    surveyid: { type: String, requied: true, defualt: null},
    paid: { type: String, requied: true, defualt: null},
    status: { type: String, requied: true, defualt: null},
    startdate: { type: Date, requied: true, defualt: null},
    finaldate: { type: Date, requied: true, defualt: null},
    data: { type: String, requied: true, defualt: null}, //The type might have to be JSON? 
    active: { type: String, requied: true, defualt: null},

});

const userSurvey = mongoose.model('userSurvey', userSurveySchema);

module.exports = userSurvey;
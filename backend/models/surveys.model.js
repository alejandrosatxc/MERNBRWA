const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveysSchema = new Schema({
    surveyid: { type: Number, unique: true, min: 1 },
    name: { type: String, unique: true },
    survey: { type: String, default: null },
    cost: { type: Number, default: null },
    sellonline: { type: Boolean, default: 0 },
    description: { type: String, default: null },
    createdate: { type: Date, default: null },
    lawyerid: { type: Number, default: null },
    active: { type: Boolean, default: 0 }
}, {
    timestamps: true,
});
const Survey = mongoose.model('Survey', surveysSchema);
module.exports = Survey;
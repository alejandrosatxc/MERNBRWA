const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    first_name: { type: String, required: true, default: null },
    last_name: { type: String, required: true, default: null },
    email: { type: String, required: true, default: null, default: null },
    emailverifycode: { type : String, default: null },
    hash: { type: String, required: true, default: null },
    salt: { type: String, required: true, default: null },
    pwresetcode: { type: String, default: null },
    pwresetdata: { type: Date, default: null },
    active: { type: Boolean, default: null },
    clio_contactid: { type: Number, default: null },
    accesslevel: { type: Number, default: null },
    sessioncode: { type: String, default: null },
    lastaccess: { type: Date, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip: { type: String, default: null },
    dob: { type: String, default: null },
    citizen: { type: Number, default: null },
    citizen_extra: { type: String, default: null },
    military: { type: String, default: null },
    military_other: { type: String, default: null },
    military_branch: { type: String, default: null },
    emergency_name: { type: String, default: null },
    emergency_phone: { type: String, default: null },
    emergency_relationship: { type: String, default: null },
    finalize_usurveyid: { type: Number, default: null },
    attorney_firstname: { type: String, default: null },
    attorney_lastname: { type: String, default: null },
    attorney_company: { type: String, default: null },
    attorney_phone: { type: String, default: null },
    attorney_email: { type: String, default: null }
}, {
    timestamps: true,
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({

    role: {type: String, required: true, default: "Client"},
    firstName: { type: String, required: true, default: null },
    lastName: { type: String, required: true, default: null },
    email: { type: String, required: true, default: null, unique: true },
    emailverifycode: { type : String, default: null },
    password: { type: String, default: null},
    pwresetcode: { type: String, default: null },
    pwresetdata: { type: Date, default: null },
    active: { type: Boolean, default: null },
    clio_contactid: { type: Number, default: null },
    accesslevel: { type: Number, default: null },
    sessioncode: { type: String, default: null },
    lastaccess: { type: Date, default: null },
    intake_complete: { type: Number, default: null},
    active_forms: {type: Array, default: []}, //An array of objects describing the active arrays
    user_documents: {type: Array, default: []}, //An Array of objects descrbinge documents the user has
    phone: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip: { type: String, default: null },
    dateOfbirth: { type: String, default: null }, //TODO set this to be a specific data format
    citizen: { type: Boolean, default: null },
    citizen_extra: { type: String, default: null },
    emergencyContact: {
        firstName: { type: String, default: null},
        lastName: { type: String, default: null},
        relationship: { type: String, default: null},
        phone: { type: String, default: null}
    },
    //emergency_name: { type: String, default: null },
    //emergency_phone: { type: String, default: null },
    //emergency_relationship: { type: String, default: null },
    //finalize_usurveyid: { type: Number, default: null },
    attorney: { type: mongoose.Types.ObjectId, default: null} //could add ref: attribute to indicate doctype
}, {
    timestamps: true,
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
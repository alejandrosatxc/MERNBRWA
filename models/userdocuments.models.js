const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDocumentsSchema = new Schema({
    fields: { type: Object, default: null},
    uuid: { type: String, default: null} //unique user id
}, {
    timestamps: true,
});
const userDocument = mongoose.model('userDocument', userDocumentsSchema);
module.exports = userDocument;
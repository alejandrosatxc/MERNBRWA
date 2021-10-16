const express = require('express')
const router = express.Router()

let Document = require('../../models/userdocuments.models')
const auth = require('../../middleware/auth')

// @route   GET /api/documents
// @desc    Get a document from DB
// @access  Private

router.get('/', (req, res) => {
    const document_id = req.query.document_id

    //simple backend validation
    if(!document_id) {
        return res.status(400).json({msg: "document_id not specified"})
    }

    //Find a document by the provided id
    Document.findById({ _id: document_id })
        .then(document => res.json(document))
        .catch(err => res.status(400).json("Error: Document does not exist " + err))
})

module.exports = router;
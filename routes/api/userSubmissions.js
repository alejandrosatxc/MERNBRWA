const express = require('express')
const router = express.Router()

let userSubmission = require('../../models/usersubmissions.model');

// @router  GET /api/usersubmissions
// @desc    Get a userSubmission from DB
// @access  Private

router.get('/', (req, res) => {
    //Use params from GET request
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

module.exports = router;
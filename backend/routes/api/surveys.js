const router = require('express').Router();
let Survey = require('../../models/surveys.model');
const auth = require('../../middleware/auth')

router.route('/').get((req, res) => {
    Survey.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post(auth, (req, res) => {
    const surveyid = Number(req.body.surveyid);
    const name = req.body.name;
    const description = req.body.description;
    const cost = Number(req.body.cost);

    const newSurvey = new Survey({surveyid, name, description, cost});

    newSurvey.save()
        .then(() => res.json('Survey added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
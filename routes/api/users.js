const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config();

//User Model
const User = require('../../models/users.model');
const userSubmissions = require('../../models/usersubmissions.model')
const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const userSubmission = require('../../models/usersubmissions.model');

// @route   POST  api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    //pull out data via destructuring
    const { firstName, lastName, email, password } = req.body;

    //simple backend validation
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({msg : "Please enter all fields"});
    }

    //Check for existing user/email
    User.findOne({ email }) //This can also be written as User.findOne({ email })
      .then(user => {
            if(user) return res.status(400).json({msg : "User already exists"});

            const newUser = new User({
                firstName,
                lastName,
                email,
                password //Password is unhashed
            });

            //Create an intake form
            const intakeForm = new userSubmission({
                usurveyid : newUser._id,
                surveyid : 1,
                active : 1,
                form_status : "new",
                userResponses : null
            })

          // Create salt & hash
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.intake_complete = 0;
                  newUser.active_forms.push({
                      form_id: intakeForm._id,
                      surveyid: 1,
                      form_status: "new"
                  })
                  newUser.save() //this returns a promise
                    .then(user => {
                        //Save the new intake form in db
                        intakeForm.save()
                            .then(() => {
                                console.log("Saved: " + intakeForm)
                            })
                            .catch(err => res.status(400).json('intakeForm not saved to db'))

                        //Create JWT
                        jwt.sign(
                            { _id: user._id }, //We will know who it is by the id that is being sent. must be verified
                            process.env.jwtSecret,
                            { expiresIn : 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({ //Respond with a token so user can be authenticated an logged in
                                    token,
                                    user: {
                                        _id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email
                                    }
                                });

                            }
                        )
                        
                    });
              })
          })
          
      });
})

module.exports = router;
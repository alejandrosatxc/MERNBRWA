const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
require('dotenv').config();

//User Model
const User = require('../../models/users.model');
const bcrypt = require('bcryptjs');
// @route   POST  api/auth
// @desc    Auth new user
// @access  Public

router.post('/', (req, res) => {
    //pull out data via destructuring
    const { email, password } = req.body;

    //simple backend validation
    if(!email || !password) {
        return res.status(400).json({msg : "Please enter all fields"});
    }

    //Check for existing user/email
    User.findOne({ email }) //This can also be written as User.findOne({ email })
      .then(user => {
          if(!user) return res.status(400).json({msg : "User does not exist"});

          // Validate password
          bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg : "Invalid credentials"});

                jwt.sign(
                    { id: user.id }, //We will know who it is by the id that is being sent. must be verified
                    process.env.jwtSecret,
                    { expiresIn : 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            }
                        });

                    }
                )
            })
          
      });
});

// @route   GET  api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
})  

module.exports = router;
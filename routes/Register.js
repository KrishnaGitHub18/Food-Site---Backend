const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Create a new user
router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){ 
            return res.status(400).json({ errors: errors.array() });
        }   
        //securing the password using bcrypt parameters
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create(
                {
                    name: req.body.name,
                    password: securePassword,
                    location: req.body.location,
                    email: req.body.email
                    // name: "Krishna",
                    // password: "Krishna123",
                    // location: "Delhi",
                    // email: "krishna123@gmail.com"
                }
            )
            res.json({ success: true });
        } catch (error) {
            console.log("Error in registering the new user");
            res.json({ success: false });
        }
    }
)

module.exports = router
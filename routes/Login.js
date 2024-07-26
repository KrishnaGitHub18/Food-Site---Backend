const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Login an existing user
router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        
        //validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()){ 
            return res.status(400).json({ errors: errors.array() });
        }   
        
        try {
            let email = req.body.email;
            let checkData = await User.findOne({ email }); 
            // console.log(email, checkData, User.email);
            if (!checkData) {
            return res.status(400).json({ errors: "2 Incorrect email password combination" });
            }

            let givenPassword = req.body.password;
            if (givenPassword !== checkData.password) {
            return res.status(400).json({ errors: "1 Incorrect email password combination" });
            }

            res.status(200).json({ success: true });

        } catch (error) {
            console.log("3 Error in registering the new user", error);
            res.json({ success: false });
        }
    }
)



module.exports = router
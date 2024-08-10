const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "dc3d2#829ece#e64f05c2e6f3f#16da39$8daa9$9mft#vdfe28a313f3788f7ad";

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
            let checkData = await User.findOne({ email }); //This is an object consisting complete data of an user if matched
            // console.log(email, checkData, User.email);
            if (!checkData) {
                return res.status(400).json({ errors: "2 Incorrect email password combination" });
            }

            let givenPassword = req.body.password;
            const checkPassword = await bcrypt.compare(givenPassword, checkData.password);
            if (!checkPassword) {
                return res.status(400).json({ errors: "1 Incorrect email password combination" });
            }

            //data for jwt auth
            const data = {
                user: {
                    id: checkData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.status(200).json(
                { 
                    success: true,
                    authToken: authToken 
                }
            );

        } catch (error) {
            console.log("3 Error in registering the new user", error);
            res.json({ success: false });
        }
    }
)



module.exports = router
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = 'qwert12345';

// create a user using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Name should have atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should have atleast 5 characters').isLength({ min: 5 }),
], async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try{

    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({ success, error: "Email-id is already registered"});
    }

    const salt = await bcrypt.genSalt(10);
    const seqPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: seqPass,
    });

    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

} catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
});

//authenticate a user using "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user)
        {
            return res.status(400).json({ success, error: "Please login with valid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({ success, error: "Please login with valid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    });


// Getting logged in user details using POST "/api/auth/getuser"
router.post('/getuser', fetchuser, async(req, res) =>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
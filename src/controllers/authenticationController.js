const router = require('express').Router(); //Direclty generate a router

const auth = require('../services/authenticationService');
const { parseError } = require('../utils/mongooseErrorParser.js');

//Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body; //Cange according to what is needed for login
    try {
        let token = await auth.login({ username, password });
        return res.status(200).json(token);
    } catch (err) {
        let error = parseError(err).join(', ');
        return res.status(400).json(error);
    }
});

//Registration
router.post('/register', async (req, res) => {
    //Change datafileds accordingly
    const { email, username, password, repeatPassword, fullname } = req.body;

    try {
        let user = await auth.register({ email, username, password, repeatPassword, fullname });
        let token = await auth.login({ email, username, password });
        return res.status(201).json(token);
    } catch (err) {
        return res.status(400).json(err);
    }
});


module.exports = router;
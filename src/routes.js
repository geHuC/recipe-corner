const router = require('express').Router(); //Direclty generate a router
const path = require('path');
const submissionController = require('./controllers/submissionController.js');
const authenticationController = require('./controllers/authenticationController.js');
const userController = require('./controllers/userController.js');

router.use('/api/v1/auth', authenticationController)
router.use('/api/v1/submissions', submissionController);
router.use('/api/v1/users', userController);
router.use('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html'))
})

module.exports = router;
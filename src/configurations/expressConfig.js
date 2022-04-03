
const { auth } = require('../middlewares/authenticationMiddleware');

const initExpress = (app, express) => {
    app.use(express.json({extended: true}));
    app.use(express.urlencoded({ extended: true }));
    app.use(auth);
}

module.exports = initExpress;
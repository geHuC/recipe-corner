const jwt = require('../utils/jwtUtility');
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const auth = (req, res, next) => {
    let token = req.headers['x-authorization']
    if (token) {
        jwt.verify(token, JWT_TOKEN_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(401);
            });
    } else {
        next();
    }
}

module.exports = {
    auth,
}
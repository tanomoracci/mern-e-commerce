const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for the token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        //Verify Token
        const decoded = jwt.verify(token, config.set('jwtsecret'));
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({msg: 'token invalid'});
    };

module.exports = auth;


}
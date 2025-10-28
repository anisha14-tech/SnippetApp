const jwt = require('jsonwebtoken');

const config = require('../../config.json');

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized: no token.'});
    }

    try {
        const token = authorization.split(' ').pop();

        const verified = jwt.verify(token, config.jwtsecret);
        res.user = verified;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: invalid token.'});
    }
};

module.exports = {
    verifyToken
};

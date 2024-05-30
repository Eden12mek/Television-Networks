const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = {
                username: decoded.userInfo.username,
                id: decoded.userInfo.id,
                role: decoded.userInfo.role // Include role in the request object
            };
            next();
        }
    );
};

module.exports = verifyJWT;

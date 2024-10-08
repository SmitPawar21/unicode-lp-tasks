const jwt = require("jsonwebtoken");

const authMiddlewares = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log("middleware me aya hua token", token);

    if(!token) return res.status(403).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("good");
        next();
    } catch (err) {
        console.log(err);
    }
};

module.exports = authMiddlewares;
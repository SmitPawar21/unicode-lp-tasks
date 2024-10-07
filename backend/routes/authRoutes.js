const express = require("express");
const router = express.Router();
const {signup, login} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/signup', signup);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res)=>{
    res.status(201).send("This is a protected route");
});

module.exports = router;
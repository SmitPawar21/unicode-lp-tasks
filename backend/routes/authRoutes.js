const express = require("express");
const router = express.Router();
const {signup, login} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/signup', signup);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res)=>{
    res.status(201).json({message: "you are in Protected route"});
    console.log("welcome");
});

module.exports = router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// let refreshTokens = [];

//signup
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) {
            res.status(400).json({ error: 'password is required!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        console.log(password);
        // const newUser = new User({ email, password: hashedPassword });

        const savedUser = await User.create({
            email: email,
            password: hashedPassword,
        })

        console.log(savedUser);

        // const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (err) {
        res.status(400).json({ error: `User already exists -> ${err}` });
    }
}

//login
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    
    await User.findOneAndUpdate(user._id, {
        email,
        password,
        refreshTokens: refreshToken
    })

    console.log(token);

    userId = user._id;

    res.status(201).json({ token, refreshToken });
}

const refreshToken = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const user = await User.findOne({token});

    if(!token && !(refreshTokens.includes(token))) {
        return res.status(403).json({ error: 'Token not valid' });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userId = user._id) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1' });
        res.json({ accessToken: newAccessToken });
    });
}

module.exports = { signup, login, refreshToken };

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/user");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}
));

app.use(cookieParser());
// app.use(cors());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.status(201).json({ message: 'hello smit' });
})

app.get('/show', async (req, res) => {
    const allUserData = await User.find();
    res.status(201).json({ allUserData })
})

app.listen(5000, () => {
    console.log('Server started');
});
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./lib/dbConnection');
const path = require('path');
const ejsmate = require('ejs-mate');
const authRouter = require('./routes/auth.routes');
const studentRouter = require('./routes/student.routes');
const adminRouter = require('./routes/admin.routes');
const ExpressError = require('./utils/ExpressError');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
// Configure session middleware
app.use(
  session({
      secret: process.env.SECRET, // Replace with a secure secret key
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsmate);
// Connect to MongoDB
connectDB();

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/auth', authRouter);
app.use('/student', studentRouter);
app.use('/admin', adminRouter);
app.use((req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  let {statusCode=500, message="Something went wrong"} = err;
  res.status(statusCode).render('error', { message});
}
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`${PORT}`);
});

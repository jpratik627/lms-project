const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://jpratik627:test123@cluster0.sadjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/taskmanager', requireAuth, (req, res) => res.render('taskmanager'));
app.get('/coursepage', requireAuth, (req, res) => res.render('coursepage'));
app.get('/basics', requireAuth, (req, res) => res.render('basics'));
app.get('/media', requireAuth, (req, res) => res.render('media'));
app.get('/css', requireAuth, (req, res) => res.render('css'));
app.get('/boxmodel', requireAuth, (req, res) => res.render('boxmodel'));
app.get('/user', requireAuth, (req, res) => res.render('user'));
app.use(authRoutes);
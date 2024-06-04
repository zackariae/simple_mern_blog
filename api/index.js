// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User');

// Initialize Express application
const app = express();
const port = 3000;

// Define constants
const secret = 'ljkljy786876cvyuii';
const db = 'mongodb+srv://sebaizakariae:It5bepwGGEZKGhNq@simpleblogcluster.t3zdilv.mongodb.net/?retryWrites=true&w=majority&appName=simpleblogCluster';

// Middleware setup
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Enable CORS for a specific origin
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const userDoc = await UserModel.create({ username, password: hash });
    res.json(userDoc);
  } catch (error) {
    console.log("Registration error:", error);
    res.status(400).json(error);
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await UserModel.findOne({ username });
  if (!userDoc) {
    return res.status(400).json('Wrong credentials');
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});

// Profile endpoint
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' }); // Return a 401 error if no token is found
    }
  
    jwt.verify(token, secret, (err, info) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' }); // Return a 401 error if token verification fails
      }
      res.json(info); // Return the decoded token information
    });
  });

// Logout endpoint
app.post('/logout', (req, res) => {
  res.cookie('token', '').json({ message: 'Logged out' });
});


app.get('/create', (req,res)=>{
    res.body("wlcom in create");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

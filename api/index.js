// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User');

const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const PostModel = require('./models/Post');

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
app.use('/uploads', express.static(__dirname + '/uploads'));

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
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(info);
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.cookie('token', '').json({ message: 'Logged out' });
});

// Create endpoint
app.get('/create', (req, res) => {
  res.send("welcome in create");
});

// Create post endpoint
app.post('/post/create', uploadMiddleware.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;

  try {
    fs.renameSync(path, newPath);
  } catch (error) {
    return res.status(500).json({ error: 'File renaming error' });
  }

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, summary, content } = req.body;

    try {
      const postDoc = await PostModel.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    } catch (error) {
      console.log('Post creation error:', error);
      res.status(500).json({ error: 'Post creation error' });
    }
  });
});

// Fetch posts endpoint
app.get('/posts', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author', 'username -_id').sort({ createdAt: -1 }).limit(20);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

// Fetch single post endpoint
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findById(id).populate('author', 'username');
    res.json(postDoc);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});

// Update post endpoint
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    try {
      fs.renameSync(path, newPath);
    } catch (error) {
      return res.status(500).json({ error: 'File renaming error' });
    }
  }

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, title, summary, content } = req.body;
    try {
      const postDoc = await PostModel.findById(id);
      if (postDoc.author.toString() !== info.id) {
        return res.status(400).json('You are not the author');
      }

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath ? newPath : postDoc.cover;

      const updatedPostDoc = await postDoc.save();
      res.json(updatedPostDoc);
    } catch (error) {
      console.log('Update post error:', error);
      res.status(500).json({ error: 'Update post error' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

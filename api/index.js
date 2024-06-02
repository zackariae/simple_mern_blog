const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'ljkljy786876cvyuii';
const cookieParser = require('cookie-parser')
const db = 'mongodb+srv://sebaizakariae:It5bepwGGEZKGhNq@simpleblogcluster.t3zdilv.mongodb.net/?retryWrites=true&w=majority&appName=simpleblogCluster'
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json()); 
app.use(cookieParser());
mongoose.
connect(db).
then(console.log("connected to MongoDb ")).
catch((error)=>console.log(error));



app.post('/register',async (req, res) => {
  const {username,password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password,salt);
  try {
    
    const userDoc = await UserModel.create({username,password:hash});
    res.json(userDoc);

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  
});




app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await UserModel.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({username,id:userDoc._id},secret,{}, (err,token)=>{
            if(err)throw err
            res.cookie('token',token).json('ok');
        });
    }else{
        res.status(400).json('wrong Credentials');
    }
   
});


app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        if(err)throw err
        res.json(info);
    });
});











app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


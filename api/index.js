const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Boat = require('./models/Boat.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require('fs');
const mime = require('mime-types');
const { Console } = require('console');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const bucket = 'dawid-booking-app';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:5173',
}));

// store images in Amazon Cloud Store
//Not Done because of fees
async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get('/api/test', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json('test ok');
});

app.post('/api/register', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {name,email,password} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});

app.post('/api/login', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/api/profile', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  console.log("profile her...");

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


app.post('/api/upload-by-link', async (req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  console.log(newName);
 
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  });
  console.log("image added");

 // const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
 // res.json(url);
 res.json(newName);
});

//const photosMiddleware = multer({dest:'/tmp'});
const photosMiddleware = multer({dest:'uploads/'});
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
   // const url = await uploadToS3(path, originalname, mimetype);
   const parts = originalname.split('.');       
    const ext = parts[parts.length - 1];
    const newPath = path +'.'+ ext;   

    fs.renameSync(path,newPath);
    console.log(newPath);

    uploadedFiles.push(newPath.replace('uploads\\',''));
    //uploadedFiles.push(finalPath);

  }
  res.json(uploadedFiles);
});

app.post('/api/boats', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
    title,boattype,address,addedPhotos,description,price,
    perks,extraInfo,startDate,stopDate,maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const boatDoc = await Boat.create({
      owner:userData.id,price,
      title,boattype,address,photos:addedPhotos,description,
      perks,extraInfo,startDate,stopDate,maxGuests,
    });
    res.json(boatDoc);
  });
});

app.get('/api/user-boats', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Boat.find({owner:id}) );
  });
});

app.get('/api/boats/:id', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {id} = req.params;
  res.json(await Boat.findById(id));
});

app.put('/api/boats', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
    id, title,boattype,address,addedPhotos,description,
    perks,extraInfo,startDate,stopDate,maxGuests,price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err; 

    const boatDoc = await Boat.findById(id);
    if (userData.id === boatDoc.owner.toString()) {
      boatDoc.set({
        title,boattype,address,photos:addedPhotos,description,
        perks,extraInfo,startDate,stopDate,maxGuests,price,
      });
      await boatDoc.save();
      res.json('ok');
    }
  });
});

app.get('/api/boats', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json( await Boat.find() );
});

app.post('/api/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
    boat,startDate,stopDate,numberOfGuests,name,phone,price,
  } = req.body;
  Booking.create({
    boat,startDate,stopDate,numberOfGuests,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});



app.get('/api/bookings', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('boat') );
});
console.log("Server running...");
app.listen(4000);
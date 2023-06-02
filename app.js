const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const VIEWS = path.join(__dirname, 'public')
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const { getUser, questions, imgModel } = require("./models/model");
require("./conn");
// const { router } = require("./imgroute");
var quizQuestions;

//to render static files
app.use(express.static(path.join(__dirname, 'public')));

//for body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/api', router);

//configure multer to handle image upload
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      const uploadedFile = req.file; // Access the uploaded file using req.file
  
      const imageBuffer = await sharp(uploadedFile.path)
        .resize({ width: 800, height: 600 })
        .toBuffer(); // Process and store the uploaded file as binary data
  
      fs.unlinkSync(uploadedFile.path); // Remove the original uploaded file
  
      const newImg = new imgModel({
        image: imageBuffer,
        imageContentType: uploadedFile.mimetype,
      }); // Create a new document with the image data
  
      await newImg.save(); // Save the image to the MongoDB database
  
      res.json({ message: 'Image uploaded successfully' }); // Send a response back to the client
    } catch (error) {
      console.error(error); // Handle any errors that occur during the upload
      res.status(500).json({ error: 'An error occurred during image upload' });
    }
  });


//fetches the question from the database ans hosts it
app.get("/quizQuestions", async (req, res, next) => {
    async function getQuestions() {
        try {
           const question = await questions.find({});
            quizQuestions = question;
        //    console.log(question);
           
        } catch (err) {
            console.error(err);
        }

        //added a middleware function
    };
    getQuestions();
    next();
}, async function(req, res){
    console.log( quizQuestions );
    res.send( await quizQuestions);
});

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root : VIEWS});
});

app.get('/quiz', (req, res) => {
    res.sendFile("/quiz/quiz.html", { root : VIEWS});
})

app.get('/imgUpload', (req, res) => {
    res.sendFile("imgUpload.html", { root : VIEWS});
});

app.get('/signup', (req, res) => {
    res.sendFile("index.html", { root : VIEWS});
});

app.post('/signup', (req, res) => {
 
    //gets the userdetails from the form
    const { username, email, password } = req.body;
    console.log( username, password, email );

    //assigns the userdetails  to the set schema and stores it in the database 
    const user = new getUser({
        name: `${username}`,
        //email: `${email}`,
        password: `${password}`,
        // age: 30
    });

    user.save().then(() => {
        console.log('User created');
        }).catch((err) => {
        console.log('Error creating user:', err);
    });

    //retrives the data from the database
    async function getDocs() {
        try {
           const docs = await getUser.find({});
           console.log(docs);
        } catch (err) {
            console.error(err);
        }
    }

    getDocs();

    res.redirect('/quiz/quiz.html'); 

});


app.listen(port);
console.log("app started on port"  +" "+ `${port}`)

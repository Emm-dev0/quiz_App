const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const VIEWS = path.join(__dirname, 'public')
const mongoose = require('mongoose');

// dependencies for image handling and upload
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const router = express.Router();

const { getUser, questions, imgModel } = require("./models/model");
require("./conn")
var quizQuestions;

//to render static files
app.use(express.static(path.join(__dirname, 'public')));

//for body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure mutler to handle flle uploads
const upload = multer({ dest: 'uploads/'});


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

//route to handle the image upload
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        //access the uploaded file using req.file
        const uploadedFile = req.file;

        //process and store the uploaded file as binary data
        const imageBuffer = await sharp(uploadedFile.path)
            .resize({ width: 800, height: 600 }).toBuffer();

        //remove the originally uploaded file
        fs.unlinkSync(uploadedFile.path);

        //create a new question document with the image data
        const newImg = new imgModel({
            image: imageBuffer,
            imageContentType: uploadedFile.mimetype,
        });

        //save the image to the mongodb database
        await newImg.save();

        //send a response back to the client
        res.json({ message: 'img uploaded successfuly'});
            
    } catch (error) {
        //handle any error the occurs
        console.error(error);
    }
});

module.exports = router;

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

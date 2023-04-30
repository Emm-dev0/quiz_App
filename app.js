const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const VIEWS = path.join(__dirname, 'public')
const mongoose = require('mongoose');
const { addUser, getUser } = require("./models/model");
require("./conn")
var questionss;

//to render static files
app.use(express.static(path.join(__dirname, 'public')));

//for body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    res.sendFile("login.html", { root : VIEWS});
0});

app.get('/quiz', (req, res) => {
    res.sendFile("/quiz/quiz.html", { root : VIEWS});
})

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
           questionss = docs;
           console.log(questionss);
        } catch (err) {
            console.error(err);
        }
    }

    getDocs();


    app.get('/question-array', (req, res) => {
        res.send(questionss);
    })

    res.redirect('/quiz/quiz.html'); 

})


app.listen(port);
console.log("app started on port"  +" "+ `${port}`)

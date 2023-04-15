const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const VIEWS = path.join(__dirname, 'public')
const mongoose = require('mongoose');
const User = require("./models/model");
require("./conn")
const fetchRouter = require('./routes/fetch_route');
// const cors = require('cors');

app.use('/', fetchRouter);
//to render static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors)

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
    const { username, email, password } = req.body;
    console.log( username, password, email );

    const user = new User({
    name: `${username}`,
    //   email: `${email}`,
    password: `${password}`,
    // age: 30
    });

    user.save().then(() => {
    console.log('User created');
    }).catch((err) => {
    console.log('Error creating user:', err);

    });

   
    res.redirect('/quiz/quiz.html'); 

})

app.listen(port);
console.log("app started on port"  +" "+ `${port}`)
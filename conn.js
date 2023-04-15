const mongoose = require("mongoose");
const url =  "mongodb://127.0.0.1:27017/school";

mongoose.connect(
   url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connection successful');
    }).catch((e) => {
        console.log("db not connected")
    })


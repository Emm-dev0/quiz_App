const mongoose = require('mongoose');
require("../conn");

const userSchema =  new mongoose.Schema({
    id: String,
    question: String,
    options: String,
    correct: String

});

userTable = mongoose.model('users', userSchema);

module.exports = {
    fetchData: (callback) => {
        const questData  = userTable.find({});
        questData.exec((err, data) => {
            if (err) throw err;
            return callback(data);
        })
    }
}
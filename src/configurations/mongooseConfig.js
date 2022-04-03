const mongoose = require('mongoose');

function connectToDB(DB_CONNECTION_STRING){
    return mongoose.connect(DB_CONNECTION_STRING);
}

module.exports = connectToDB;
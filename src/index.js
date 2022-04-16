//Require packages
const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_MD;
const routes = require('./routes')

//Setup configurations
require('./configurations/expressConfig')(app, express); //express
const mongoDbConnection = require('./configurations/mongooseConfig'); //mongoose
const { urlencoded } = require('express');

//Setup the router
app.use(express.static(path.join(__dirname,"build")));
app.use(cors());
app.use(routes);
app.use(urlencoded);
// app.use(function (req, res) {
//     res.status(404);
// });
//Start sequence
//Making sure we have a DB connection before letting anyone interact with the service 
mongoDbConnection(DB_CONNECTION_STRING).then(() => {
    console.log(`Connected to DB at`, DB_CONNECTION_STRING);
    //Start the server on DB connection
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    })
    })
    .catch(err => console.error('Cannot connect to database: ', err));

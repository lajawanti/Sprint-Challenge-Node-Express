const express = require('express');

//database
const actiondb = require('./data/helpers/actionModel.js');
const projectdb = require('./data/helpers/projectModel.js');

//config-- Middleware
const configureMiddleware = require('./config/middleware.js');

const server = express();

server.listen(9000, () => {
    console.log("Server running on port 9000");
})
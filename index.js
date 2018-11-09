const express = require('express');

//database
const actiondb = require('./data/helpers/actionModel.js');
const projectdb = require('./data/helpers/projectModel.js');

//config-- Middleware
const configureMiddleware = require('./config/middleware.js');

const server = express();
/*****  PROJECTS and ACTIONS  GET *****/
server.get('/api/projects', (request, response) => {
    projectdb.get()
          .then(projects => {
                response.status(200).json(projects); 
           })
          .catch(error => {
                response.status(500).json({error : 'The projects data could not be retrieved'})
           }) 
})

server.get('/api/actions', (request, response) => {
    actiondb.get()
          .then(actions => {
                response.status(200).json(actions); 
           })
          .catch(error => {
                response.status(500).json({error : 'The actions data could not be retrieved'})
           }) 
})

/*****  ACTIONS : GET  by ID   *****/
server.get('/api/actions/:id', (request, response) => {
    actiondb.get(request.params.id)
          .then(actions => {
                response.status(200).json(actions); 
           })
          .catch(error => {
                response.status(500).json({error : 'The actions data could not be retrieved'})
           }) 
})



server.listen(9000, () => {
    console.log("Server running on port 9000");
})
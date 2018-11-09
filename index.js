const express = require('express');

//database
const actiondb = require('./data/helpers/actionModel.js');
const projectdb = require('./data/helpers/projectModel.js');

//config-- Middleware
//const configureMiddleware = require('./config/middleware.js');
const server = express();
server.use(express.json()); // built in

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

/*****  PROJECTS and ACTIONS  POST *****/
server.post('/api/projects', (request, response) => {
    //const {name, description, completed} = request.body;
    if(request.body.name !== undefined && request.body.description !== undefined && request.body.completed !== undefined) {
    projectdb.insert(request.body)
          .then(projectId => {
                response.status(201).json(projectId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating project', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
}) 

server.post('/api/actions', (request, response) => {
    const {project_id, description, notes, completed} = request.body;
    if(project_id !== undefined && notes !== undefined && description !== undefined && completed !== undefined) {
    actiondb.insert(request.body)
          .then(actionId => {
                response.status(201).json(actionId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating action', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide notes and description for the action." })
    }
}) 



server.listen(9000, () => {
    console.log("Server running on port 9000");
})
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

/*****  PROJECTS and ACTIONS DELETE *****/
server.delete('/api/projects/:id', (request, response) => {
    projectdb.remove(request.params.id)
          .then(count => {
              response.status(200).json(count);
           })
          .catch(error => {
              response.status(500).json({message : 'error deleting user'})
           })
})

server.delete('/api/actions/:id', (request, response) => {
    actiondb.remove(request.params.id)
          .then(count => {
              response.status(200).json(count);
           })
          .catch(error => {
              response.status(500).json({message : 'error deleting user'})
           })
})

/*****  PROJECTS and ACTIONS UPDATE *****/
server.put('/api/projects/:id', (request, response) => {
    const {name, description, completed} = request.body;
        projectdb.update(request.params.id, request.body)
              .then(count => {
                  if(count) {
                        response.status(200).json(count);
                  } else {
                        response.status(404).json({ message: "The project with the specified ID does not exist." })
                  }
               })
              .catch(error => {
                   response.status(500).json({ error: "The project information could not be modified." })
               })
})

server.put('/api/actions/:id', (request, response) => {
    const {project_id, notes, description, completed} = request.body;
        actiondb.update(request.params.id, request.body)
              .then(count => {
                  if(count) {
                        response.status(200).json(count);
                  } else {
                        response.status(404).json({ message: "The project with the specified ID does not exist." })
                  }
               })
              .catch(error => {
                   response.status(500).json({ error: "The project information could not be modified." })
               })
})

//getProjectActions---
server.get('/api/projects/:id/actions', (request, response) =>{
     projectdb.getProjectActions(request.params.id)
              .then(actions => {
                    if(actions.length < 1) {
                            response.status(404).json(`no action found for project  : ${request.params.name}`)
                    }
                    response.status(200).json(actions);
               })
              .catch(error => response.status(500).json(error));
})


server.listen(9000, () => {
    console.log("Server running on port 9000");
})






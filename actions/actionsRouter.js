const express = require('express');
const actiondb = require("../data/helpers/actionModel");

const router = express.Router();

/***** ACTIONS GET *****/
router.get('/', (request, response) => {
    actiondb.get()
             .then(projects => {
                    response.status(200).json(projects); 
              })
             .catch(error => {
                    response.status(500).json({error : 'The projects data could not be retrieved'})
              }) 
})

/***** ACTIONS GET BY ID *****/
router.get('/:id', (request, response) => {
    actiondb.get(request.params.id)
             .then(project => {
                    response.status(200).json(project); 
              })
             .catch(error => {
                    response.status(500).json({error : 'The projects data could not be retrieved'})
              }) 
})
    
/***** ACTIONS POST *****/
router.post('/', (request, response) => {
    if(request.body.name && request.body.description) {
        actiondb.insert(request.body)
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

/***** ACTIONS DELETE *****/
router.delete('/:id', (request, response) => {
    actiondb.remove(request.params.id)
             .then(count => {
                count ? res.status(200).json({ message: "Project successfully deleted." })
                      : res.status(404).json({ message: "The project with the specified ID does not exist."})
              })
             .catch(error => {
                    response.status(500).json({message : 'error deleting user'})
              })
})

/***** ACTIONS UPDATE *****/
router.put('/:id', (request, response) => {
    const {name, description, completed} = request.body;
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

module.exports = router;
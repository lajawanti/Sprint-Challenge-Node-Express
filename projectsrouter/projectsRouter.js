const express = require("express");
const projectdb = require("../data/helpers/projectModel");

const router = express.Router();


/***** PROJECTS GET *****/
router.get('/', (request, response) => {
    projectdb.get()
             .then(projects => {
                    response.status(200).json(projects); 
              })
             .catch(error => {
                    response.status(500).json({error : 'The projects data could not be retrieved'})
              }) 
})

/***** PROJECTS GET BY ID *****/
router.get('/:id', (request, response) => {
    projectdb.get(request.params.id)
             .then(project => {
                    response.status(200).json(project); 
              })
             .catch(error => {
                    response.status(500).json({error : 'The projects data could not be retrieved'})
              }) 
})
    
/***** PROJECTS POST *****/
router.post('/', (request, response) => {
    if(request.body.name && request.body.description) {
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

/***** PROJECTS DELETE *****/
router.delete('/:id', (request, response) => {
    projectdb.remove(request.params.id)
             .then(count => {
                count ? res.status(200).json({ message: "Project successfully deleted." })
                      : res.status(404).json({ message: "The project with the specified ID does not exist."})
              })
             .catch(error => {
                    response.status(500).json({message : 'error deleting user'})
              })
})

/***** PROJECTS UPDATE *****/
router.put('/:id', (request, response) => {
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

//getProjectActions---
router.get('/:id/actions', (request, response) =>{
    projectdb.getProjectActions(request.params.id)
             .then(actions => {
                        if(actions.length < 1) {
                                response.status(404).json(`no action found for project : ${request.params.name}`)
                        } else {
                                response.status(200).json(actions);
                        }
              })
             .catch(error => response.status(500).json(error));
})

module.exports = router;
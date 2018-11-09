import React from 'react';
import {Link} from 'react-router-dom';


const ProjectDisplay = (props) => {
    return (
            <div>
                <Link to = '/api/projects/:id/actions' ><h3>Project Name : {props.project.name} </h3> </Link>
                <p>Project Descri. : {props.project.description} </p>
            </div>
    )
}


export default ProjectDisplay;
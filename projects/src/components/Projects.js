import React from 'react';
import axios from 'axios';
import ProjectDisplay from './ProjectDisplay';

class Projects extends React.Component{
    constructor(){
        super();
        this.state = {
            projects : [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/projects')
             .then(response => this.setState({projects : response.data}))
             .catch(error => console.log(error));
    }

    render() {
        console.log(this.state.projects)
        return (
            <div>
                {this.state.projects.map(project => <ProjectDisplay 
                                                                key = {project.id}
                                                                project = {project} />
                )}
            </div>
        )
    }
}


export default Projects;

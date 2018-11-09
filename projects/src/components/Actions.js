import React from 'react';
import axios from 'axios';

class Actions extends React.Component{
    constructor(){
        super();
        this.state = {
            actions : [],
        }
    }

    actionsForProject() {
        axios.get('http://localhost:9000/api/projects/:id/actions')
             .then(response => this.setState({actions : response.data}))
             .catch(error => console.log(error));
    }

    render() {
        console.log("$$  : ",this.state.actions)
        return (
            <div>
                {/*this.state.actions.map(action => 
                )*/}
            </div>
        )
    }
}


export default Actions;

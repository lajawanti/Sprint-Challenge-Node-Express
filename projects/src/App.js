import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Projects from './components/Projects'
import Actions from './components/Actions';


class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Projects..</h1>
          <Route exact  path = '/api/projects' component = {Projects}> </Route>

          <Route exact path = '/api/projects/:id/actions' component = {Actions} />
      </div>
    );
  }
}

export default App;

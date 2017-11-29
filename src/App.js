import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import { Input, Button, SubTitle } from 'reactbulma'


class App extends Component {
  
  state = {
    tasks: ['Write some code.', 'Go for a run.'],
    searchPhrase: ''
  }

  handleChangeQuery = (event) => {
    this.setState({searchPhrase: event.target.value})
  }

  handleSubmitQuery = (event) => {
    event.preventDefault();
    this.setState({
      searchPhrase: '',
      tasks: [this.state.searchPhrase, ...this.state.tasks]
    });
  }

  render() {

    const { tasks, searchPhrase } = this.state;

    return (
      <div className="App">
        <Header totalIncomplete={tasks.length} title="INCOMPLETE"/>
        <hr/>
        <form onSubmit={this.handleSubmitQuery}>
          <Input large 
            placeholder="Search / Add a todo!" 
            value={searchPhrase} 
            onChange={this.handleChangeQuery}/>
          <br/>
          <br/>
          <Button medium>Submit</Button>
        </form>
        {
          tasks
            .filter(task => task.includes(searchPhrase))
            .map((task) => <SubTitle>{task}</SubTitle>)
        }
      </div>
    );
  }
}

export default App;

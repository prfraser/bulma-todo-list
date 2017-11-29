import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import { Input, Button, SubTitle, Title } from 'reactbulma'


class App extends Component {
  
  state = {
    tasks: [
      { todo: 'Go for a run', time: '29/11/2017, 13:26:50', complete: true },
      { todo: 'Do some coding', time: '29/11/2017, 13:27:50', complete: false }
    ],
    searchPhrase: ''
  }

  handleChangeQuery = (event) => {
    this.setState({searchPhrase: event.target.value})
  }

  handleSubmitQuery = (event) => {
    event.preventDefault();
    const existingItem = this.state.tasks.find(task => task.todo === this.state.searchPhrase);
    if (!existingItem) {
      this.setState({
        searchPhrase: '',
        tasks: [{ todo: this.state.searchPhrase, time: new Date().toLocaleString() }, ...this.state.tasks]
      });
    } else {
      this.setState({
        searchPhrase: ''
      })
    }
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
            .filter(task => task.todo.includes(searchPhrase))
            .map((task) => <ListItem todo={task.todo} time={task.time} complete={task.complete} /> )
        }
      </div>
    );
  }
}

const ListItem = ({ todo, time, complete }) => (
  <div>
    <Title is="3">{todo}</Title>
    <SubTitle is="6">{time}</SubTitle>
    { complete && '💀' }
  </div>
)

export default App;

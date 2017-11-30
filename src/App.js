import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { Input, Button, SubTitle, Title, Notification } from 'reactbulma';
import axios from 'axios';

class App extends Component {
  
  state = {
    tasks: [],
    searchPhrase: ''
  }

  handleChangeQuery = (event) => {
    this.setState({searchPhrase: event.target.value})
  }

  handleSubmitQuery = (event) => {
    event.preventDefault();
    const existingItem = this.state.tasks.find(task => task.todo === this.state.searchPhrase);
    if (!existingItem) {
      axios.post('/api/tasks', {
          todo: this.state.searchPhrase,
          time: new Date(),
          complete: false
        })
        .then((response) => {
          console.log(response);
          this.setState({
            searchPhrase: '',
            tasks: [...this.state.tasks, response.data]
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({
        searchPhrase: ''
      })
    }
  }

  toggleComplete = (_id) => {
    const foundTodoIndex = this.state.tasks.findIndex(task => task._id === _id)
    this.setState(prevState => {
      const tasks = prevState.tasks
      tasks[foundTodoIndex].complete = !tasks[foundTodoIndex].complete
      return {tasks}
    })
  }

  render() {

    const { tasks, searchPhrase } = this.state;

    return (
      <div className="App">
        <Header 
          totalIncomplete={tasks.filter(task => !task.complete).length} 
          totalComplete={tasks.filter(task => task.complete).length}/>
        <hr/>
        <form onSubmit={this.handleSubmitQuery}>
          <Input autoFocus large 
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
            .map((task) => <ListItem key={task._id} {...task} toggleComplete={this.toggleComplete} /> )
        }
      </div>
    );
  }

  componentDidMount(){
    axios.get('api/tasks')
      .then((response) => {
        console.log(response.data);
        this.setState({
          tasks: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

const ListItem = ({ todo, time, complete, toggleComplete, _id }) => (
  <Notification onClick={ () => toggleComplete(_id) }>
    { complete ? <Title is="3" className="completed">{todo}💀</Title> : <Title is="3">{todo}</Title> }
    <SubTitle is="6">{time.toLocaleString()}</SubTitle>
  </Notification> 
)

export default App;

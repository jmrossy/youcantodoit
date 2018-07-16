import React, { Component } from 'react';
import './App.css';
import CreateBar from './CreateBar';
import Todo from './Todo';
import SideBar from './SideBar';
import SimpleStorage from "react-simple-storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCaretDown, faCaretUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0, //index counter for todo ids
      todos: {},
      todoSelected: null,
      filter: 'all',
      sortField: 'created',
      sortAsc: false,
      showAbout: false
    };
  }

  createTodo(title) {
    if (!title || title.length < 1) return;

    const id = this.state.idx + 1;

    const newTodo = {
      id: id,
      checked: false,
      title: title,
      notes: '',
      dueDate: 0,
      color: '',
      created: new Date()
    };

    this.setState({
      idx: id,
      todos: { ...this.state.todos, [id]: newTodo },
      todoSelected: this.state.todoSelected || newTodo
    });
  }

  getTodos() {
    const todos = Object.values(this.state.todos);
    const filter = this.state.filter;
    const sortField = this.state.sortField;
    const sortAsc = this.state.sortAsc;

    const filteredTodos = todos.filter((todo) => {
      if (filter === 'all') return todo;
      if (filter === 'unchecked' && !todo.checked) return todo;
      if (filter === 'checked' && todo.checked) return todo;
      return null;
    })

    return filteredTodos.sort((a, b) => {
      if (sortAsc) return a[sortField] < b[sortField]
      else return a[sortField] > b[sortField]
    })
  }

  selectTodo(id) {
    this.setState({ todoSelected: this.state.todos[id] });
  }

  updateTodo(id, key, value, updateSelected = true) {
    const updatedTodo = { ...this.state.todos[id] };
    updatedTodo[key] = value;

    this.setState({
      todos: { ...this.state.todos, [id]: updatedTodo },
      todoSelected: updateSelected ? updatedTodo : this.state.todoSelected
    });
  }

  handleFilterChange(filter) {
    this.setState({ filter: filter });
  }

  handleSortChange(e) {
    this.setState({ sortField: e.target.value });
  }

  handleSortOrderChange() {
    this.setState({ sortAsc: !this.state.sortAsc });
  }

  handleClearCompletedClick() {
    const todos = this.state.todos;
    const todoSelected = this.state.todoSelected;
    const filteredTodos  = {};

    for (var id of Object.keys(todos)){
      if (todos[id].checked) continue;
      filteredTodos[id] = todos[id];
    }

    this.setState({
      todos: filteredTodos,
      // If selected was checked, it's gone now so replace with last made todo
      todoSelected: todoSelected.checked ? filteredTodos[id] : todoSelected
    });
  }

  handleAboutClick() {
    this.setState({ showAbout: !this.state.showAbout });
  }

  render() {
    return (
      <div className="app">

        <SimpleStorage parent={this} />

        <nav className="top-nav">
          <h1><FontAwesomeIcon icon={faCoffee} size="xs" /> You Can (To)Do It!
            <FontAwesomeIcon className="about-app" icon={faQuestionCircle} size="sm" onClick={() => this.handleAboutClick()} />
          </h1>
          {this.state.showAbout &&
            <div className="about-info">
              This is a fun little Todo tracker app by <a href="https://jmrossy.com">J M Rossy</a>. Hope you enjoy it!
            </div>
          }
          <CreateBar createTodo={(title) => this.createTodo(title)} />
          <div className="filter-bar">
            <div className="filters">
              <button className={this.state.filter === 'all' ? 'active' : ''} onClick={() => this.handleFilterChange('all')}>All</button>
              <button className={this.state.filter === 'unchecked' ? 'active' : ''} onClick={() => this.handleFilterChange('unchecked')}>Active</button>
              <button className={this.state.filter === 'checked' ? 'active' : ''} onClick={() => this.handleFilterChange('checked')}>Completed</button>
            </div>
            <div className="cleaners">
              <button onClick={() => this.handleClearCompletedClick()}>Clear Completed</button>
            </div>
            <div className="sorters">
              <select onChange={(e) => this.handleSortChange(e)}>
                <option value="created">Date Created</option>
                <option value="dueDate">Due Date</option>
                <option value="color">Color</option>
                <option value="title">Title</option>
              </select>
              <button onClick={() => this.handleSortOrderChange()}>
                <FontAwesomeIcon icon={this.state.sortAsc ? faCaretDown : faCaretUp} />
              </button>
            </div>
          </div>
        </nav>

        {this.state.todoSelected &&
          <div className="list-container">
            <div className="todo-list">
              {this.getTodos().map(todo => {
                return <Todo key={'todo-item' + todo.id}
                  id={todo.id}
                  selected={todo.id === this.state.todoSelected.id}
                  checked={todo.checked}
                  title={todo.title}
                  color={todo.color}
                  selectTodo={(todo) => this.selectTodo(todo)}
                  updateTodo={(id, key, value, updateSelected) => this.updateTodo(id, key, value, updateSelected)} />
              })}
            </div>
            <SideBar id={this.state.todoSelected.id}
              title={this.state.todoSelected.title}
              dueDate={this.state.todoSelected.dueDate}
              notes={this.state.todoSelected.notes}
              color={this.state.todoSelected.color}
              updateTodo={(id, key, value, updateSelected) => this.updateTodo(id, key, value, updateSelected)} />
          </div>
        }

      </div>
    );
  }
}

export default App;

/* TODO
undo/redo
search
Due today marked critical
landing experience
stress test long values 
todo reordering drag and drop
i16z tests
*/
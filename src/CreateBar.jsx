import React, { Component } from 'react';
import './CreateBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class CreateBar extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.defaultState = {
      newTodoTitle: ''
    };
    this.state = this.defaultState;
  }

  handleChange(e) {
    this.setState({ newTodoTitle: e.target.value });
  }

  handleSubmit(e) {
    this.props.createTodo(this.state.newTodoTitle);
    this.setState(this.defaultState);
    e.preventDefault();
  }

  render() {
    return (
      <div className="create-bar">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="new-todo-title"
            type="text"
            placeholder="I need to..."
            value={this.state.newTodoTitle} 
            onChange={(e) => this.handleChange(e)}
            autoFocus />
          <button className="new-todo-button" type="submit"><FontAwesomeIcon icon={faPlusCircle}/></button>
        </form>
      </div>
    )
  }
}

export default CreateBar;
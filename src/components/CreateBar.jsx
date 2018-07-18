import React, { Component } from 'react';
import './CreateBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class CreateBar extends Component {

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.input.value.trim()) return;

    this.props.createTodo(this.guid(), this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <div className="create-bar">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="new-todo-title"
            type="text"
            placeholder="I need to..."
            ref={node => this.input = node}
            autoFocus />
          <button className="new-todo-button" type="submit"><FontAwesomeIcon icon={faPlusCircle}/></button>
        </form>
      </div>
    )
  }
}

export default CreateBar;
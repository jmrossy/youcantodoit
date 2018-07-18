import './Todo.css'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class Todo extends Component {

  handleCheckboxClick() {
    this.props.updateTodo(this.props.id, "checked", !this.props.checked);
  }

  handleTitleChange(e) {
    const newTitle = e.target.value;
    this.props.updateTodo(this.props.id, "title", newTitle);
  }

  handleSelect(e) {
    //Don't select if the click was just to checkbox
    if (e.target.className === "todo-checkbox") return;
    this.props.selectTodo(this.props.id);
  }

  render() {
    return (
      <div className={'todo-item ' + (this.props.checked ? 'checked ' : '') + (this.props.selected ? 'selected ' : '') + this.props.color}
        onClick={(e) => this.handleSelect(e)}>
        <button className="todo-checkbox" onClick={() => this.handleCheckboxClick()}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <input type="text" className="todo-title" value={this.props.title} onChange={(e) => this.handleTitleChange(e)} />
      </div>
    );
  }
}

export default Todo;
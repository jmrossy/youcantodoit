import './SideBar.css'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import { updateTodo } from '../actions'

class SideBar extends Component {

  handleDueDateChange(e) {
    const newDate = e.target.value;
    this.updateTodoProperty("dueDate", newDate);
  }

  handleNotesChange(e) {
    const newNotes = e.target.value;
    this.updateTodoProperty("notes", newNotes);
  }

  handleColorChange(color) {
    this.updateTodoProperty("color", color);
  }

  updateTodoProperty(key, value) {
    if (!this.props.todo) return;
    this.props.updateTodo(this.props.todo.id, key, value);
  }

  render() {
    return (
      <div className={'sidebar ' + (this.props.todo ? 'enabled' : 'disabled') }>
        <h2>{this.props.todo && this.props.todo.title}</h2>
        <div className="todo-color">
          <span className="default" onClick={() => this.handleColorChange('')}></span>
          <span className="red" onClick={() => this.handleColorChange('red')}></span>
          <span className="yellow" onClick={() => this.handleColorChange('yellow')}></span>
          <span className="green" onClick={() => this.handleColorChange('green')}></span>
          <span className="blue" onClick={() => this.handleColorChange('blue')}></span>
          <span className="purple" onClick={() => this.handleColorChange('purple')}></span>
        </div>
        <div className="todo-date">
          <label htmlFor="due-date"><FontAwesomeIcon icon={faCalendar} /></label>
          <input type="date"
            value={this.props.todo && this.props.todo.dueDate}
            name="due-date"
            onChange={(e) => this.handleDueDateChange(e)} />
        </div>
        <div className="todo-notes">
          <label htmlFor="notes"><FontAwesomeIcon icon={faEdit} /> Notes</label>
          <textarea cols="20" rows="10"
            name="notes"
            placeholder="Don't forget to..."
            value={this.props.todo && this.props.todo.notes}
            onChange={(e) => this.handleNotesChange(e)} />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  todo: state.todos.find(todo => todo.id===state.selected)
})

const mapDispatchToProps = dispatch => ({
  updateTodo: (id, key, value) => dispatch(updateTodo(id, key, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);  

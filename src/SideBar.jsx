import React, { Component } from 'react'
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';

class SideBar extends Component {

  handleDueDateChange(e) {
    const newDate = e.target.value;
    this.props.updateTodo(this.props.id, "dueDate", newDate);
  }

  handleNotesChange(e) {
    const newNotes = e.target.value;
    this.props.updateTodo(this.props.id, "notes", newNotes);
  }

  handleColorChange(color) {
    this.props.updateTodo(this.props.id, "color", color);
  }

  render() {
    return (
      <div className="sidebar">
        <h2>{this.props.title}</h2>
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
            value={this.props.dueDate}
            name="due-date"
            className={this.props.dueDate === 0 ? 'empty' : ''}
            onChange={(e) => this.handleDueDateChange(e)} />
        </div>
        <div className="todo-notes">
          <label htmlFor="notes"><FontAwesomeIcon icon={faEdit} /> Notes</label>
          <textarea cols="20" rows="10"
            name="notes"
            placeholder="Don't forget to..."
            value={this.props.notes}
            onChange={(e) => this.handleNotesChange(e)} />
        </div>
      </div>
    );
  }

}

export default SideBar;
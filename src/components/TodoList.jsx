import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import { selectTodo, updateTodo, Filters, SortOrders, SortFields } from '../actions'

class TodoList extends Component {
  render() {
    return (
      <div className="todo-list">
        {this.props.todos.map(todo => {
          return <Todo key={'todo-item-' + todo.id}
            {...todo}
            selected={todo.id === this.props.selected}
            selectTodo={this.props.selectTodo}
            updateTodo={this.props.updateTodo} />
        })}
      </div>
    );
  }
}

const getTodoList = (allTodos, filter, sortField, sortOrder) => {
  const filteredTodos = allTodos.filter((todo) => {
    switch (filter) {
      case Filters.SHOW_ALL:
        return true;
      case Filters.SHOW_COMPLETED:
        return todo.checked;
      case Filters.SHOW_ACTIVE:
        return !todo.checked;
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  });

  const sorted = filteredTodos.sort((a, b) => {
    let aVal = a[sortField], bVal = b[sortField];

    // Special logic for Due dates because the date selector input uses string values and doesn't like dates
    // but the strings aren't sorting right
    if (sortField === SortFields.DUE){
      let convertToDate = (val) => val === 0 ? new Date(2100,1,1) : new Date(val);
      aVal = convertToDate(aVal);
      bVal = convertToDate(bVal);
    }

    if (sortOrder === SortOrders.ASC) return aVal < bVal;
    else return aVal > bVal
  })

  return sorted;
}

const mapStateToProps = state => ({
  todos: getTodoList(state.todos, state.filter, state.sortField, state.sortOrder),
  selected: state.selected
})

const mapDispatchToProps = dispatch => ({
  selectTodo: id => dispatch(selectTodo(id)),
  updateTodo: (id, key, value) => dispatch(updateTodo(id, key, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);  

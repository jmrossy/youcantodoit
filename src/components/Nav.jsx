import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Filters, SortFields, SortOrders, setFilter,
  setSortField, toggleSortOrder, createTodo, clearCompleted
} from '../actions';
import CreateBar from './CreateBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCaretDown, faCaretUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showAbout: false
    };
  }

  handleSortChange(e) {
    const sortField = e.target.value;
    this.props.setSortField(sortField);
  }

  handleAboutClick() {
    this.setState({ showAbout: !this.state.showAbout });
  }

  render() {
    return (
      <nav className="top-nav">
        <h1><FontAwesomeIcon icon={faCoffee} size="xs" /> You Can (To)Do It!
            <FontAwesomeIcon className="about-app" icon={faQuestionCircle} size="sm" onClick={() => this.handleAboutClick()} />
        </h1>
        {this.state.showAbout &&
          <div className="about-info">
            This is a fun little Todo tracker app by <a href="https://jmrossy.com">J M Rossy</a>. Hope you enjoy it!
            </div>
        }
        <CreateBar createTodo={this.props.createTodo} />

        <div className="filter-bar">
          <div className="filters">
            <button className={this.props.filter === Filters.SHOW_ALL ? 'active' : ''}
              onClick={() => this.props.setFilter(Filters.SHOW_ALL)}>All</button>
            <button className={this.props.filter === Filters.SHOW_ACTIVE ? 'active' : ''}
              onClick={() => this.props.setFilter(Filters.SHOW_ACTIVE)}>Active</button>
            <button className={this.props.filter === Filters.SHOW_COMPLETED ? 'active' : ''}
              onClick={() => this.props.setFilter(Filters.SHOW_COMPLETED)}>Completed</button>
          </div>

          <div className="cleaners">
            <button onClick={() => this.props.clearCompleted()}>Clear Completed</button>
          </div>

          <div className="sorters">
            <select onChange={(e) => this.handleSortChange(e)}>
              <option value={SortFields.CREATED}>Date Created</option>
              <option value={SortFields.DUE}>Due Date</option>
              <option value={SortFields.COLOR}>Color</option>
              <option value={SortFields.TITLE}>Title</option>
            </select>
            <button onClick={() => this.props.toggleSortOrder()}>
              <FontAwesomeIcon icon={this.props.sortOrder === SortOrders.ASC ? faCaretDown : faCaretUp} />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
  sortField: state.sortField,
  sortOrder: state.sortOrder
})

const mapDispatchToProps = dispatch => ({
  createTodo: (id, title) => dispatch(createTodo(id, title)),
  clearCompleted: () => dispatch(clearCompleted()),
  setFilter: filter => dispatch(setFilter(filter)),
  setSortField: sortField => dispatch(setSortField(sortField)),
  toggleSortOrder: () => dispatch(toggleSortOrder()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Nav);  

import { combineReducers } from 'redux'
import { todos, selected } from './todos'
import { filter, sortField, sortOrder } from './filters';

export default combineReducers({
  todos,
  selected,
  filter,
  sortField,
  sortOrder
})

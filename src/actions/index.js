export const Types = {
  CREATE_TODO: 'CREATE_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  SELECT_TODO: 'SELECT_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  SET_FILTER: 'SET_FILTER',
  SET_SORT_FIELD: 'SET_SORT_FIELD',
  TOGGLE_SORT_ORDER: 'TOGGLE_SORT_ORDER'
}

export const createTodo = (id, title) => ({
  type: Types.CREATE_TODO,
  id,
  title
});

export const updateTodo = (id, key, value) => ({
  type: Types.UPDATE_TODO,
  id,
  key,
  value
});

export const selectTodo = (id) => ({
  type: Types.SELECT_TODO,
  id
});

export const clearCompleted = () => ({
  type: Types.CLEAR_COMPLETED,
});

export const setFilter = filter => ({
  type: Types.SET_FILTER,
  filter
});

export const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const setSortField = sortField => ({
  type: Types.SET_SORT_FIELD,
  sortField
});

export const SortFields = {
  // Small case to match fields in todo, facilitates sorting later
  CREATED: 'created',
  DUE: 'dueDate',
  TITLE: 'title',
  COLOR: 'color'
}

export const toggleSortOrder = () => ({
  type: Types.TOGGLE_SORT_ORDER
});

export const SortOrders = {
  ASC: 'ASC',
  DEC: 'DEC',
};
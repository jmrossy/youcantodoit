import { Types } from '../actions'

export const todos = (state = [], action) => {
  switch (action.type) {
    case Types.CREATE_TODO:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          checked: false,
          notes: '',
          dueDate: 0,
          color: '',
          created: new Date() 
        }
      ];
    case Types.UPDATE_TODO:
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, [action.key]: action.value }
          : todo);
    case Types.CLEAR_COMPLETED:
      return state.filter(todo => !todo.checked);
    default:
      return state;
  }
}

export const selected = (state = null, action) => {
  switch (action.type) {
    case Types.SELECT_TODO:
      return action.id;
    default:
      return state;
  }
}
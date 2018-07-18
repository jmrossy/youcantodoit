import { Filters, SortFields, SortOrders, Types } from '../actions'

export const filter = (state = Filters.SHOW_ALL, action) => {
  switch (action.type) {
    case Types.SET_FILTER: 
      return action.filter;
    default:
      return state;
  }
}

export const sortField = (state = SortFields.CREATED, action) => {
  switch (action.type) {
    case Types.SET_SORT_FIELD:
      return action.sortField;
    default:
      return state;
  }
}

export const sortOrder = (state = SortOrders.DEC, action) => {
  switch (action.type) {
    case Types.TOGGLE_SORT_ORDER:
      return state === SortOrders.ASC ? SortOrders.DEC : SortOrders.ASC;
    default:
      return state;
  }
}

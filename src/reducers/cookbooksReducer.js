const defaultState = {
  cookbooks: [],
  selectedCookbook: {},
  cookbookUserInput: ''
}

const cookbooksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return { ...state, cookbookUserInput: action.payload }
    case 'GET_COOKBOOKS':
      return { ...state, cookbooks: action.payload }
    case 'SET_COOKBOOK':
      return { ...state, selectedCookbook: action.payload }
    default:
      return state;
  }
}

export default cookbooksReducer
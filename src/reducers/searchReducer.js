const defaultState = {
  userInput: '',
  searchResults: []
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return { ...state, userInput: action.payload }
    case 'GET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload}
    default:
      return state
  }
}

export default searchReducer
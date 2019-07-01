const defaultState = {
  userInput: '',
  searchResults: [],
  singleRecipeResult: null
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return { ...state, userInput: action.payload }
    case 'GET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload }
    case 'GET_SINGLE_RECIPE_RESULT':
      return { ...state, singleRecipeResult: action.payload }
    default:
      return state
  }
}

export default searchReducer
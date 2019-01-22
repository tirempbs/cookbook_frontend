const defaultState = {
  recipes: [],
  selectedRecipes: []
}

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      return { ...state, recipes: action.payload }
    case 'SET_RECIPES':
      return { ...state, selectedRecipes: action.payload}
    default:
      return state;
  }
}

export default recipesReducer
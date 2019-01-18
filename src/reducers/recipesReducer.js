const defaultState = {
  recipes: [],
  selectedRecipes: []
}

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      return { ...state, recipes: action.payload }
    default:
      return state;
  }
}

export default recipesReducer
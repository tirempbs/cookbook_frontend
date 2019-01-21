export const fetchRecipes = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/recipes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(getRecipes(JSONResponse)))
  }
}

export const getRecipes = (recipeData) => ({
  type: 'GET_RECIPES',
  payload: recipeData
})

export const setRecipes = (recipeData) => ({
  type: 'SET_RECIPES',
  payload: recipeData
})
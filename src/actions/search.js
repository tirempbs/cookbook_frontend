export const recipeSearch = (userInput) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/search/${userInput}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(resultsData=>dispatch(getSearchResults(resultsData)))
  }
}

export const getSearchResults = (resultsData) => ({
  type: 'GET_SEARCH_RESULTS',
  payload: resultsData
}) 

export const singleRecipeFetch = (recipeID) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/single-recipe/${recipeID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(recipeData=>dispatch(getSingleRecipeResult(recipeData)))
  }
}

export const getSingleRecipeResult = (recipeData) => ({
  type: 'GET_SINGLE_RECIPE_RESULT',
  payload: recipeData
})

export const inputUpdate = (event) => ({
  type: 'UPDATE_TEXT',
  payload: event.target.value
})
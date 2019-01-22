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
      .then(r => r.json())
      .then(JSONresponse => dispatch(getSearchResults(JSONresponse)))
  }
}

export const getSearchResults =(searchData) => ({
  type: 'GET_SEARCH_RESULTS',
  payload: searchData
}) 

export const inputUpdate = (event) => ({
  type: 'UPDATE_TEXT',
  payload: event.target.value
})
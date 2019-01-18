export const fetchCookbooks = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/cookbooks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => response.json())
    .then((JSONResponse) => dispatch(getCookbooks(JSONResponse)))
  }
}

export const getCookbooks = (cookbooksData) => ({
  type: 'GET_COOKBOOKS',
  payload: cookbooksData
})

export const setCookbook = (cookbookData) => ({
  type: 'SET_COOKBOOK',
  payload: cookbookData
})
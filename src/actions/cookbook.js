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

export const createCookbook = (user_id, title) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/cookbooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        cookbook: {
          user_id: user_id,
          title: title
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => console.log(JSONResponse))
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_COOKBOOK_CREATION', payload: e.message })))
  }
}

export const failedCookbookCreation = (errorMsg) => ({
  type: 'FAILED_COOKBOOK_CREATION',
  payload: errorMsg
})

export const getCookbooks = (cookbooksData) => ({
  type: 'GET_COOKBOOKS',
  payload: cookbooksData
})

export const setCookbook = (cookbookData) => ({
  type: 'SET_COOKBOOK',
  payload: cookbookData
})

export const cookbookInputUpdate = (event) => ({
  type: 'UPDATE_TEXT',
  payload: event.target.value
})
const defaultState = {
  cookbooks: [],
  selectedCookbook: {}
}

const cookbooksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_COOKBOOKS':
      return { ...state, cookbooks: action.payload }
    case 'SET_COOKBOOK':
      return { ...state, selectedCookbook: action.payload }
    default:
      return state;
  }
}

export default cookbooksReducer
const defaultState = {
    user: null,
    loggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    failedCreation: false,
    error: null
}

const usersReducer = (state=defaultState, action) => {
    switch (action.type) {
        // TODO: move to types
        case 'SET_CURRENT_USER':
            return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
        case 'AUTHENTICATING_USER':
            return { ...state, authenticatingUser: true }
        case 'AUTHENTICATED_USER':
            return { ...state, authenticatingUser: false }
        case 'LOGOUT_USER':
            return { ...state, defaultState }
        case 'FAILED_LOGIN':
            return {
                ...state,
                failedLogin: true,
                error: action.payload,
                authenticatingUser: false
            }
        case 'FAILED_CREATION':
            return {
              ...state,
              failedCreation: true,
              error: action.payload
            }
        default:
            return state
    }
}

export default usersReducer
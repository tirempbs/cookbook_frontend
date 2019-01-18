import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import cookbooksReducer from './cookbooksReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({ 
  usersReducer: usersReducer,
  cookbooksReducer: cookbooksReducer,
  recipesReducer: recipesReducer
})

export default rootReducer
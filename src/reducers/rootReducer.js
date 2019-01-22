import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import cookbooksReducer from './cookbooksReducer';
import recipesReducer from './recipesReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({ 
  usersReducer: usersReducer,
  cookbooksReducer: cookbooksReducer,
  recipesReducer: recipesReducer,
  searchReducer: searchReducer
})

export default rootReducer
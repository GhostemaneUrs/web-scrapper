import { combineReducers } from '@reduxjs/toolkit'
import auth from './slices/auth'
import users from './slices/users'
import entities from './slices/entities'

const rootReducer = combineReducers({
  auth,
  users,
  entities,
})

export default rootReducer

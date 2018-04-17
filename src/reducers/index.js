import { combineReducers } from 'redux'
import { reducer as info } from './info'
import { reducer as app } from './app'
import { reducer as boards } from './boards'
import { reducer as lists } from './lists'
import { reducer as cards } from './cards'
import { reducer as members } from './members'
import { reducer as user } from './user'

export default combineReducers({
  info,
  app,
  boards,
  lists,
  cards,
  members,
  user,
})

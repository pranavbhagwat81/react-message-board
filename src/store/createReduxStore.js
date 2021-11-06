import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const initialState = {}

export default () => {
  return createStore(
    rootReducer,
    initialState,
  )
}
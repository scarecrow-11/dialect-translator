import {combineReducers} from 'redux'
import translateReducer from './translateReducer'

const rootReducer = combineReducers({
    translate: translateReducer
})

export default rootReducer
import {combineReducers} from 'redux'
import studentReducer from './studentReducer'


const rootReducer = combineReducers({
    students: studentReducer
})

export default rootReducer;
import {
    FETCH_ACTIONS_SUCCESS,
    FETCH_ACTIONS_FAILURE,
    ADD_ACTION,
    DELETE_ACTION,
    UPDATE_DEFAULTENTRIES,
    UPDATE_CURRENTPAGEVAL,
    UPDATE_SORTING,
    UPDATE_SEARCHVAL
} from '../actions/constants'

const initialState = {
    studentList: [],
    defaultEntries: 20,
    count: 0,
    currentSkipVal: 0,
    currentPageVal: 1,
    currentSortVal: 'studentId',
    searchVal: ''
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_ACTIONS_SUCCESS:
            return {
                ...state,
                studentList: action.payload.students,
                count: action.payload.count
            }
        
        case FETCH_ACTIONS_FAILURE:
            return {
                ...state,
                studentList: [],
                count: 0
            }

        case ADD_ACTION:
            return {
                ...state
            }

        case DELETE_ACTION:
            return {
                ...state
            }

        case UPDATE_DEFAULTENTRIES:
            return {
                ...state,
                defaultEntries: action.value
            }

        case UPDATE_CURRENTPAGEVAL:
            return {
                ...state,
                currentPageVal: action.value.currentPageVal,
                currentSkipVal: action.value.currentSkipVal                
            }

        case UPDATE_SORTING:
            return {
                ...state,
                currentSortVal: action.value
            }
        
        case UPDATE_SEARCHVAL:
            return {
                ...state,
                searchVal: action.value
            }

        default:
        return state;
        
    }
}
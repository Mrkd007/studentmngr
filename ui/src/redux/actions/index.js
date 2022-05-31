import {FETCH_ACTIONS, ADD_ACTION_REQUEST, DELETE_ACTION_REQUEST,
    UPDATE_DEFAULTENTRIES,
    UPDATE_CURRENTPAGEVAL,
    UPDATE_SORTING,
    UPDATE_SEARCHVAL,
    UPDATE_SUBJFILTER,
    BLOACK_UI
} from './constants'

export const fetch_actions = (data, cb) =>{
    return {
        type: FETCH_ACTIONS,
        payload: data,
        cb
    }
}

export const add_action = (text, cb) => {
    return {
        type: ADD_ACTION_REQUEST,
        payload: text,
        cb
    }
}

export const delete_action = (id, cb) => {
    return {
        type: DELETE_ACTION_REQUEST,
        payload: id,
        cb
    }
}

export const update_defaultEntries = (value) => {
    return {
        type: UPDATE_DEFAULTENTRIES,
        value
    }
}

export const update_currentPageVal = (value) => {
    return {
        type: UPDATE_CURRENTPAGEVAL,
        value
    }
}

export const update_sorting = (value) => {
    return {
        type: UPDATE_SORTING,
        value
    }
}

export const update_search = (value) => {
    return {
        type: UPDATE_SEARCHVAL,
        value
    }
}

export const update_subjectFilter = (value) => {
    return {
        type: UPDATE_SUBJFILTER,
        value
    }
}

export const block_ui = (value) => {
    return {
        type: BLOACK_UI,
        value
    }
}
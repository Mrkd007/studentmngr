import { call, put, takeLatest } from 'redux-saga/effects'
import {
    FETCH_ACTIONS,
    FETCH_ACTIONS_SUCCESS,
    FETCH_ACTIONS_FAILURE,
    ADD_ACTION,
    DELETE_ACTION_REQUEST,
    DELETE_ACTION,
    ADD_ACTION_REQUEST
} from '../actions/constants'
import axios from 'axios';

// const baseUrl = 'http://localhost:5500/v1'
const baseUrl = 'https://itskd.io/v1'

function fetchActionsFromApi(url){
    return axios.get(url);           
}

function addActionToDatabase(url, data){
    return axios.post(url,data)
}

function deleteActionFromDatabase(url){
    return axios.delete(url)
}

function* fetchActions(action){
    let url = baseUrl + '/all';
    const {limit, searchVal, skip, sort, subjects } = action.payload;
    url = `${url}?limit=${limit}&skip=${skip}&sortValue=${sort}&searchtext=${searchVal}`;
    if(subjects && subjects.length) {
        subjects.forEach(elm => {
            url += '&subjects=' + elm;
        });
    }

    try {
        const response = yield call(fetchActionsFromApi, url)
        if(action.cb) {
            action.cb();
        }
        yield put({type:FETCH_ACTIONS_SUCCESS,'payload':response.data})
    } catch(e){        
        yield put({type: FETCH_ACTIONS_FAILURE,'payload':[]})
    }
}

function* addAction(action){
    const url = baseUrl + '/add'
    try{
        const response = yield call(addActionToDatabase, url, action.payload);
        if(action.cb) {
            action.cb();
        }
        yield put({type: ADD_ACTION,payload: response.data})
    } catch(e){
        yield put({type:FETCH_ACTIONS_FAILURE})
    }
}

function* deleteAction(action){
    let url = baseUrl + '/delete?id=' + action.payload;
    try{
        const response = yield call(deleteActionFromDatabase, url);
        yield put({type: DELETE_ACTION,payload: response.data})
    } catch(e){
        yield put({type:FETCH_ACTIONS_FAILURE})
    }

}

function* uiSaga() {
    yield takeLatest(FETCH_ACTIONS,fetchActions);
    yield takeLatest(ADD_ACTION_REQUEST,addAction)
    yield takeLatest(DELETE_ACTION_REQUEST,deleteAction)
}

export default uiSaga;
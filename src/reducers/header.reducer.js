import {Header} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'


const initialState = fromJS({
    user:{
        tourist:0,
        online:0
    }
});

export default createReducer(initialState, {
    [Header.UPDATE_USER_NUMBER]:(state,action)=>{
        return state.merge({
            user:action.user
        })
    }
});
import {ChatView} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'


const initialState = fromJS({
    chatList:[]
});

export default createReducer(initialState, {
    [ChatView.GET_NEW_MESSAGE]:(state,action)=>{
        return state.update("chatList",chatList=>chatList.concat(action.chatList))
    }
});
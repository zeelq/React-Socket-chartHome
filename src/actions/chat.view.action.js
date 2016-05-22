import {ChatView} from '../actions/types'
import {Header} from '../actions/types'
export const getNewMessage=(chatList)=>{
    return (dispatch)=>{
        dispatch({
            type:ChatView.GET_NEW_MESSAGE,
            chatList:chatList
        });
    }
};
export const updateUserNumber=(user)=>{
    return (dispatch)=>{
        dispatch({
            type:Header.UPDATE_USER_NUMBER,
            user:user
        });
    }
};
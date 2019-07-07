import { SET_MESSAGE } from '../actions/actionTypes'

export const SetMessage = message => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
} 

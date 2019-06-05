import {USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes'  

// Define o estado do componete
const initialState = {
    name: null,
    email: null
}

// Definur minha função reducer

const reducer = (state = initialState,action)  => {
    switch (action.type) {
        case USER_LOGGED_IN: 
        return {
            // pega tudo objeto atual e replica novo
            ...state,
            name: action.payload.name,
            email: action.payload.email
        }
        case USER_LOGGED_OUT:
        return {
            ...state,
            name: null,
            email: null
         }
         default:
            return state
         
    }
} 

export default reducer
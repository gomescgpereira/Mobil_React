import {USER_LOGGED_IN, USER_LOGGED_OUT,LOADING_USER , USER_LOADED} from '../actions/actionTypes'  

// Define o estado do componete
const initialState = {
    name: null,
    email: null,
    isLoading: false 
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
         case LOADING_USER:
         return {
            ...state,
            isLoading: true
          }
         case USER_LOADED:
             return {
                 ...state,
                 isLoading: false
             }

         default:
            return state
         
    }
} 

export default reducer
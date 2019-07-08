import {USER_LOGGED_IN, USER_LOGGED_OUT,LOADING_USER , USER_LOADED } from './actionTypes'
import axios  from 'axios'
import { SET_MESSAGE } from '../actions/actionTypes'
import { SetMessage } from './message';

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyCiTc5VHO1qUUT4o0j1jFpAQfHIWVFAaZs'

// export const login = user => {
//     return {
//         type: USER_LOGGED_IN,
//         payload: user
//     }
// }

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    } 
}


export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`,{
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .catch(err => console.log(err))
        .then( res => {
            if (res.data.localId) {
                axios.put(`/users/${res.data.localId}.json`, {
                    name: user.name
                })
                .catch(err => console.log(err))
                .then( res => {
                   dispatch(login(user))
                })
            }
        })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        // Carregando usuario
        dispatch(loadingUser())
        //  
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`,{
           email: user.email,
           password: user.password,
           returnSecureToken: true
        })
        .catch(err => console.log(err))
        .then( res => {
            if (res.data.localId) {
                user.token = res.data.idToken
                // Pegar na base o nome do usuario
                axios.get(`/users/${res.data.localId}.json`)
                .catch(err =>  {
                    dispatch(SetMessage({
                        title: 'Erro',
                        text: 'Ocorreu um erro inesperado!'
                    }))
                })
                .then( res => {
                    delete user.password
                    user.id = res.data.localId
                    user.name = res.data.name
                    dispatch(userLogged(user))
                    // Usuario Carregado
                    dispatch(userLoaded())
                })
            }
        })
    }
}
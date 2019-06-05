import { createStore, combineReducers}  from 'redux'
import useReducer from './reducers/user'
import postsReducer from './reducers/post'

//Para a gente defenir storage de nossa aplicação

const reducers = combineReducers({
    user: useReducer,
    posts: postsReducer 
})

// A partie dai em qualquer ligar do meu aplicativo usando chave "user" e terei acesso


const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig

import { createStore,
         combineReducers,
         compose,
         applyMiddleware

    }  from 'redux'
import  thunk from 'redux-thunk'
import useReducer from './reducers/user'
import postsReducer from './reducers/post'
import messageReducer from './reducers/message'

//Para a gente defenir storage de nossa aplicação

const reducers = combineReducers({
    user: useReducer,
    posts: postsReducer,
    message: messageReducer

})

// A partie dai em qualquer ligar do meu aplicativo usando chave "user" e terei acesso


const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig


import bankdatareducer from './bankdatareducer';
const redux = require('redux')
//const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware =require('redux-thunk').default

const store = createStore(bankdatareducer,applyMiddleware(thunkMiddleware))


export default store;
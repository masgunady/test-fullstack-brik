import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth'
import productReducer from './product'

const authConfig = {
    key: 'auth',
    storage: storage

}

const reducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    product: productReducer

})

export default reducer

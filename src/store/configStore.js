import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import memberReducer from './memberReducer';


const persistConfig = {
    key: 'member',
    storage,
}
const persistedReducer = persistReducer(persistConfig, memberReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

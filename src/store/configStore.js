import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import memberReducer from './memberReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'member',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, memberReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

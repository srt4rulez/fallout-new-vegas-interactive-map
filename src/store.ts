import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './Slices/appSlice';

const persistConfig = {
    key: 'root',
    version: 2,
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    app: appReducer,
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: { // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);

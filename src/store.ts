import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    createTransform,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './Slices/appSlice';
import type { MarkerInterface } from './types';
import markersFromJson from 'Data/markers.json';

const markers = (markersFromJson as Array<MarkerInterface>);

const appTransformer = createTransform(
    // transform state on its way to being serialized and persisted. (eg pushed into local storage)
    (inboundState: {
        markers: Array<MarkerInterface>;
    }) => {
        const newMarkers = inboundState.markers.map((marker) => {
            // Only store ID and isFound. We don't want to save lat/lng or anything else that
            // may change in the future.
            return {
                id: marker.id,
                isFound: ('isFound' in marker) ? marker.isFound : false,
            };
        });

        return {
            ...inboundState,
            markers: newMarkers,
        };
    },
    // transform state being rehydrated (eg pulled from local storage)
    (outboundState) => {
        // Local storage markers from v2. We only saved id and isFound fields.
        const v2Markers = outboundState.markers;

        const newMarkers = markers.map((marker) => {
            let isFound = false;

            const v2MarkerIndex = v2Markers.findIndex((v2Marker) => v2Marker.id === marker.id);

            if (v2MarkerIndex !== -1 && ('isFound' in v2Markers[v2MarkerIndex])) {
                isFound = Boolean(v2Markers[v2MarkerIndex].isFound);
            }

            return {
                ...marker,
                isFound: isFound,
            };
        });

        return {
            ...outboundState,
            markers: newMarkers,
        };
    },
    {
        whitelist: [
            'app'
        ],
    }
);

const persistConfig = {
    key: 'root',
    version: 2,
    storage: storage,
    transforms: [
        appTransformer,
    ],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    app: appReducer,
}));

let isFoundMarkersShown = false;

// Check if the user is using v1 with the previous local storage method.

if (window.localStorage.getItem('isFoundMarkersShown')) {
    isFoundMarkersShown = Boolean(window.localStorage.getItem('isFoundMarkersShown'));

    // Set the old data as v1_isFoundMarkersShown in case we need it again.
    window.localStorage.setItem('v1_isFoundMarkersShown', window.localStorage.getItem('isFoundMarkersShown') || '');

    // Now that we migrated it, remove it so this code doesn't run again.
    window.localStorage.removeItem('isFoundMarkersShown');

    // Set a flag to let our react component know we migrated.
    window.localStorage.setItem('hasMigratedOldData', '1');
}

if (window.localStorage.getItem('markers')) {
    const oldMarkersAsString = window.localStorage.getItem('markers');
    const oldMarkers = (oldMarkersAsString ? (JSON.parse(oldMarkersAsString) as Array<MarkerInterface>) : []);

    oldMarkers.forEach((oldMarker: MarkerInterface) => {
        const newMarkerIndex = markers.findIndex((marker) => marker.id === oldMarker.id);

        if (newMarkerIndex !== -1) {
            markers[newMarkerIndex] = {
                ...markers[newMarkerIndex],
                isFound: oldMarker.isFound,
            };
        }
    });

    // Set the old data as v1_markers in case we need it again.
    window.localStorage.setItem('v1_markers', window.localStorage.getItem('markers') || '');

    // Now that we migrated it, remove it so this code doesn't run again.
    window.localStorage.removeItem('markers');

    // Set a flag to let our react component know we migrated.
    window.localStorage.setItem('hasMigratedOldData', '1');
}

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: { // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
    preloadedState: { // initial state of store.
        app: {
            markers: markers,
            isFoundMarkersShown: isFoundMarkersShown,
        },
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);

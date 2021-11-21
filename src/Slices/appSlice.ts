import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import type {
    MarkerInterface,
    MarkerType,
} from 'types';
import {
    typeMap,
} from 'types';
import markersFromJson from 'Data/markers.json';

let isFoundMarkersShown = false;

// Check if the user is using v1 with the previous local storage method.

if (window.localStorage.getItem('isFoundMarkersShown')) {
    isFoundMarkersShown = Boolean(window.localStorage.getItem('isFoundMarkersShown'));

    // Now that we migrated it, remove it so this code doesn't run again.
    window.localStorage.removeItem('isFoundMarkersShown');
}

const markers = (markersFromJson as Array<MarkerInterface>);

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

    // Now that we migrated it, remove it so this code doesn't run again.
    window.localStorage.removeItem('markers');
}

interface AppStateInterface {
    markers: Array<MarkerInterface>;
    isFoundMarkersShown?: boolean;
}

const initialState: AppStateInterface = {
    markers: markers,
    isFoundMarkersShown: isFoundMarkersShown,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        toggleMarkerAsFound: (state: AppStateInterface, action: PayloadAction<MarkerInterface>) => {
            const marker = action.payload;

            const index = state.markers.findIndex((item) => item.id === marker.id);

            if (index !== -1) {
                state.markers[index].isFound = !(state.markers[index].isFound);
            }
        },
        toggleShowFoundMarkers: (state: AppStateInterface) => {
            state.isFoundMarkersShown = !state.isFoundMarkersShown;
        },
        filterMarkerType: (state: AppStateInterface, action: PayloadAction<MarkerType>) => {
            const type = action.payload;

            state.markers.forEach((marker) => {
                marker.isHidden = marker.type !== type; // hide if the clicked type is not the type this marker is.
            });
        },
        showAllMarkers: (state: AppStateInterface) => {
            state.markers.forEach((marker) => {
                marker.isHidden = false;
            });
        },
    },
});

export const {
    toggleMarkerAsFound,
    toggleShowFoundMarkers,
    filterMarkerType,
    showAllMarkers,
} = appSlice.actions;

export const selectMarkers          = (state: RootState): AppStateInterface['markers'] => state.app.markers;
export const selectSkillBookMarkers = (state: RootState): AppStateInterface['markers'] => state.app.markers.filter((marker: MarkerInterface) => marker.type === typeMap.SkillBook);
export const selectSnowGlobeMarkers = (state: RootState): AppStateInterface['markers'] => state.app.markers.filter((marker: MarkerInterface) => marker.type === typeMap.SnowGlobe);

export const selectIsFoundMarkersShown = (state: RootState): AppStateInterface['isFoundMarkersShown'] => state.app.isFoundMarkersShown;

export default appSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
    MarkerInterface,
    MarkerType,
} from 'types';
import {
    typeMap,
} from 'types';

interface AppStateInterface {
    markers: Array<MarkerInterface>;
    isFoundMarkersShown?: boolean;
}

const initialState: AppStateInterface = {
    markers: [],
    isFoundMarkersShown: false,
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

interface StateSelector {
    app: AppStateInterface;
}

export const selectMarkers          = (state: StateSelector): AppStateInterface['markers'] => state.app.markers;
export const selectSkillBookMarkers = (state: StateSelector): AppStateInterface['markers'] => state.app.markers.filter((marker: MarkerInterface) => marker.type === typeMap.SkillBook);
export const selectSnowGlobeMarkers = (state: StateSelector): AppStateInterface['markers'] => state.app.markers.filter((marker: MarkerInterface) => marker.type === typeMap.SnowGlobe);

export const selectIsFoundMarkersShown = (state: StateSelector): AppStateInterface['isFoundMarkersShown'] => state.app.isFoundMarkersShown;

export default appSlice.reducer;

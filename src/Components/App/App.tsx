import * as React from 'react';
import './App.scss';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';
import markersFromJson from 'Data/markers.json';
import SettingsPanel from 'Components/SettingsPanel/SettingsPanel';
import packageJson from './../../../package.json';
import type {
    MarkerInterface,
    MarkerType,
} from 'types';
import type * as L from 'leaflet';

export interface AppPropsInterface { // eslint-disable-line @typescript-eslint/no-empty-interface
}

interface AppStateInterface {
    markers: Array<MarkerInterface>;
    isFoundMarkersShown?: boolean;
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {

    state: AppStateInterface = {
        markers: [],
        isFoundMarkersShown: false,
    };

    // Only used with L.Map API.
    markers: {
        [index: string]: L.Marker;
    } = {};

    static version: string = packageJson.version;

    componentDidMount(): void {
        const localStorageMarkersJson = window.localStorage.getItem('markers') || '[]';

        const localStorageMarkers = JSON.parse(localStorageMarkersJson) as Array<MarkerInterface>;

        const newMarkers = (markersFromJson as Array<MarkerInterface>).map((marker) => {
            const localStorageMarker = localStorageMarkers.find((item) => item.id === marker.id);

            const newMarker = {
                ...marker
            };

            if (localStorageMarker) {
                newMarker.isFound = localStorageMarker.isFound;
            }

            return newMarker;
        });

        const localStorageIsFoundMarkersShown = window.localStorage.getItem('isFoundMarkersShown');

        const defaultIsFoundMarkersShown = true;

        const isFoundMarkersShown = localStorageIsFoundMarkersShown === null ? defaultIsFoundMarkersShown : localStorageIsFoundMarkersShown === '1';

        this.setState({ // eslint-disable-line react/no-did-mount-set-state
            markers: newMarkers,
            isFoundMarkersShown: isFoundMarkersShown,
        });
    }

    handleMarkButtonClick = (marker: MarkerInterface = {}) => (event: React.MouseEvent | React.ChangeEvent): void => { // eslint-disable-line @typescript-eslint/no-unused-vars

        this.setState((prevState: AppStateInterface) => {
            const index = prevState.markers.findIndex((item) => item.id === marker.id);

            if (index === -1) {
                return null;
            }

            const oldMarker = prevState.markers[index];

            const newMarkers = [...prevState.markers];

            const newMarker = {
                ...oldMarker,
                isFound: !oldMarker.isFound,
            };

            this.updateLocalStorageMarker(newMarker);

            newMarkers[index] = newMarker;

            return {
                markers: newMarkers,
            };
        });

    };

    /**
     * Set the marker in local storage as found or not.
     */
    updateLocalStorageMarker = (marker: MarkerInterface = {}): void => {
        const localStorageMarkersJson = window.localStorage.getItem('markers') || '[]';

        const localStorageMarkers = [...JSON.parse(localStorageMarkersJson) as Array<MarkerInterface>];

        const index = localStorageMarkers.findIndex((item) => item.id === marker.id);

        if (index === -1) {
            localStorageMarkers.push({
                id: marker.id,
                isFound: marker.isFound,
            });
        } else {
            localStorageMarkers[index] = {
                ...localStorageMarkers[index],
                isFound: marker.isFound,
            };
        }

        window.localStorage.setItem('markers', JSON.stringify(localStorageMarkers));
    };

    handleShowFoundMarkersClick = (): void => {

        this.setState((prevState: AppStateInterface) => {

            const newState = !prevState.isFoundMarkersShown;

            window.localStorage.setItem('isFoundMarkersShown', newState ? '1' : '0');

            return {
                isFoundMarkersShown: newState,
            };
        });

    };

    /**
     * Only show the currently clicked marker type.
     */
    handleTypeClick = (type: MarkerType) => (): void => {

        this.setState((prevState: AppStateInterface) => {

            const newMarkers = [...prevState.markers].map((marker) => {
                return {
                    ...marker,
                    isHidden: marker.type !== type, // hide if the clicked type is not the type this marker is.
                };
            });

            return {
                markers: newMarkers,
            };
        });

    };

    /**
     * Un-hide all marker types.
     */
    handleShowAllClick = (): void => {

        this.setState((prevState: AppStateInterface) => {
            const newMarkers = [...prevState.markers].map((marker) => {
                return {
                    ...marker,
                    isHidden: false,
                };
            });

            return {
                markers: newMarkers,
            };
        });

    };

    handleMapCreation = (map: L.Map): void => {

        map.on('click', (event: L.LeafletMouseEvent) => {
            // Allow figuring out what lat + lng we are clicking.
            if ((window as any).debug === true) { // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                console.log(event.latlng);
            }
        });

    };

    handleMarkerTitleClick = (markerData: MarkerInterface = {}) => (): void => {

        const marker = markerData.id && this.markers[markerData.id] || null;

        if (marker && markerData.lat && markerData.lng) {
            // Open the popup of the marker.
            marker.openPopup([markerData.lat, markerData.lng]);
        }

    };

    /**
     * When a marker is added to the map, add it to our markers property for use
     * with handleMarkerTitleClick.
     */
    handleMarkerAdd = (event: L.LeafletEvent): void => {

        const marker = event.target as L.Marker;

        const markerLatLng = marker.getLatLng();

        const lat = markerLatLng.lat;
        const lng = markerLatLng.lng;

        const markerData: MarkerInterface | undefined = this.state.markers && this.state.markers.find((item) => item.lat === lat && item.lng === lng);

        if (markerData && markerData.id) {
            this.markers[markerData.id] = marker;
        }

    };

    render(): JSX.Element | null {

        return (

            <div
                className="app"
            >

                <SettingsPanel
                    appVersion={App.version}
                    className="app__settings-panel"
                    markers={this.state.markers}
                    onMarkButtonClick={this.handleMarkButtonClick}
                    isFoundMarkersShown={this.state.isFoundMarkersShown}
                    onClickShowFoundMarkers={this.handleShowFoundMarkersClick}
                    onTypeClick={this.handleTypeClick}
                    onShowAllClick={this.handleShowAllClick}
                    onMarkerTitleClick={this.handleMarkerTitleClick}
                />

                <MojaveWastelandMap
                    className="app__mojave-wasteland-map"
                    markers={this.state.markers}
                    onMarkButtonClick={this.handleMarkButtonClick}
                    isFoundMarkersShown={this.state.isFoundMarkersShown}
                    onMapCreation={this.handleMapCreation}
                    onMarkerAdd={this.handleMarkerAdd}
                />

            </div>

        );

    }

}

export default App;

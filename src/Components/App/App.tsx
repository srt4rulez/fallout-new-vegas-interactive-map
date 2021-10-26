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
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
} from '@chakra-ui/react';

export interface AppPropsInterface { // eslint-disable-line @typescript-eslint/no-empty-interface
}

interface AppStateInterface {
    markers: Array<MarkerInterface>;
    isFoundMarkersShown?: boolean;
    isLargeScreen?: boolean;
    isSettingsDrawerOpen: boolean;
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {

    state: AppStateInterface = {
        markers: [],
        isFoundMarkersShown: false,
        isLargeScreen: true,
        isSettingsDrawerOpen: false,
    };

    // Only used with L.Map API.
    markers: {
        [index: string]: L.Marker;
    } = {};

    private static version: string = packageJson.version;

    private isLargeScreenMqList?: MediaQueryList;

    componentDidMount(): void {
        this.isLargeScreenMqList = window.matchMedia('(min-width: 1024px)');
        this.isLargeScreenMqList.addEventListener('change', this.handleLargeScreenMqListChange);

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
            isLargeScreen: this.isLargeScreenMqList.matches,
        });
    }

    handleLargeScreenMqListChange = (event: MediaQueryListEvent): void => {

        this.setState({
            isLargeScreen: event.matches,
        });

    }

    componentWillUnmount(): void {
        if (this.isLargeScreenMqList) {
            this.isLargeScreenMqList.removeEventListener('change', this.handleLargeScreenMqListChange);
        }
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

        this.handleSettingsDrawerClose();

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

        this.handleSettingsDrawerClose();

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

        this.handleSettingsDrawerClose();

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

    handleOpenSettingsClick = (): void => {

        this.setState({
            isSettingsDrawerOpen: true,
        });

    };

    handleSettingsDrawerClose = (): void => {

        this.setState({
            isSettingsDrawerOpen: false,
        });

    };

    renderSettingsPanel = (): JSX.Element => {

        return (
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
                isLargeScreen={this.state.isLargeScreen}
            />
        );

    };

    render(): JSX.Element | null {

        const AppSettingsPanel = this.renderSettingsPanel;

        return (

            <div
                className="app"
            >

                {this.state.isLargeScreen ? (

                    <AppSettingsPanel />

                ) : (

                    <div
                        className="app__small-screen-settings-button-container"
                    >

                        <Button
                            className="app__small-screen-settings-button"
                            onClick={this.handleOpenSettingsClick}
                            colorScheme="teal"
                        >
                            Open Settings
                        </Button>

                    </div>

                )}

                {/* Drawer for small screens */}
                <Drawer
                    isOpen={this.state.isSettingsDrawerOpen}
                    placement="bottom"
                    onClose={this.handleSettingsDrawerClose}
                    size="full"
                >

                    <DrawerOverlay />

                    <DrawerContent>

                        <DrawerCloseButton
                            zIndex="1"
                        />

                        <DrawerBody
                            paddingX="2"
                        >

                            <AppSettingsPanel />

                        </DrawerBody>

                    </DrawerContent>

                </Drawer>

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

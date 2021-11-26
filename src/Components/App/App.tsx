import * as React from 'react';
import './App.scss';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';
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
    useToast,
} from '@chakra-ui/react';
import {
    useMedia,
    useEffectOnce,
} from 'react-use';

const App = (): JSX.Element => {

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = React.useState(false);

    const markersRef = React.useRef<{
        [index: string]: L.Marker;
    }>({});

    const isLargeScreen = useMedia('(min-width: 1024px)');

    const toast = useToast();

    useEffectOnce(() => {
        // If the user had the old local storage method, show them a notif about it being migrated.
        if (window.localStorage.getItem('hasMigratedOldData')) {
            // We're assuming the migration was successful.
            toast({
                title: 'Data Migration Complete',
                description: 'We detected your saved data from v1 and migrated to v2! 🥳',
                status: 'success',
                isClosable: true,
                duration: null,
            });

            window.localStorage.removeItem('hasMigratedOldData');
        }
    });

    const handleTypeClick = (type: MarkerType): void => { // eslint-disable-line @typescript-eslint/no-unused-vars

        handleSettingsDrawerClose();

    };

    const handleShowAllClick = (): void => {

        handleSettingsDrawerClose();

    };

    const handleMapCreation = (map: L.Map): void => {

        map.on('click', (event: L.LeafletMouseEvent) => {
            // Allow figuring out what lat + lng we are clicking.
            if ((window as any).debug === true) { // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                console.log(event.latlng);
            }
        });

    };

    const handleMarkerTitleClick = (markerData: MarkerInterface = {}): () => void => React.useCallback((): void => {

        const marker = markerData.id && markersRef.current[markerData.id] || null;

        if (marker && markerData.lat && markerData.lng) {
            // Open the popup of the marker.
            marker.openPopup([markerData.lat, markerData.lng]);
        }

        handleSettingsDrawerClose();

    }, []);

    /**
     * When a marker is added to the map, add it to our markers property for use
     * with handleMarkerTitleClick.
     */
    const handleMarkerAdd = (marker: MarkerInterface): (event: L.LeafletEvent) => void => React.useCallback((event: L.LeafletEvent): void => {

        const leafLetMarker = event.target as L.Marker;

        if (marker && marker.id) {
            markersRef.current[marker.id] = leafLetMarker;
        }

    }, []);

    const handleOpenSettingsClick = (): void => {

        setIsSettingsDrawerOpen(true);

    };

    const handleSettingsDrawerClose = (): void => {

        setIsSettingsDrawerOpen(false);

    };

    const AppSettingsPanel = (): JSX.Element => { // eslint-disable-line react/no-multi-comp

        return (
            <SettingsPanel
                appVersion={packageJson.version}
                className="app__settings-panel"
                onTypeClick={handleTypeClick}
                onShowAllClick={handleShowAllClick}
                onMarkerTitleClick={handleMarkerTitleClick}
                isLargeScreen={isLargeScreen}
            />
        );

    };

    return (

        <div
            className="app"
        >

            {isLargeScreen ? (

                <AppSettingsPanel />

            ) : (

                <div
                    className="app__small-screen-settings-button-container"
                >

                    <Button
                        className="app__small-screen-settings-button"
                        onClick={handleOpenSettingsClick}
                        colorScheme="teal"
                    >
                        Open Settings
                    </Button>

                </div>

            )}

            {/* Drawer for small screens */}
            <Drawer
                isOpen={isSettingsDrawerOpen}
                placement="bottom"
                onClose={handleSettingsDrawerClose}
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
                onMapCreation={handleMapCreation}
                onMarkerAdd={handleMarkerAdd}
            />

        </div>

    );

};

export default App;

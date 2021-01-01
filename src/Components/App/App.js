import React, { Component } from 'react';
import './App.scss';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';
import markers from 'Data/markers.json';
import SettingsPanel from 'Components/SettingsPanel/SettingsPanel';
import packageJson from './../../../package.json';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static version = packageJson.version;

    componentDidMount() {
        const localStorageMarkersJson= window.localStorage.getItem('markers') || '[]';

        const localStorageMarkers = JSON.parse(localStorageMarkersJson);

        const newMarkers = markers.map((marker) => {
            const localStorageMarker = localStorageMarkers.find((item) => item.id === marker.id);

            if (localStorageMarker) {
                marker.isFound = localStorageMarker.isFound;
            }

            return marker;
        });

        const localStorageIsFoundMarkersShown = window.localStorage.getItem('isFoundMarkersShown');

        const defaultIsFoundMarkersShown = true;

        const isFoundMarkersShown = localStorageIsFoundMarkersShown === null ? defaultIsFoundMarkersShown : localStorageIsFoundMarkersShown === '1';

        this.setState({
            markers: newMarkers,
            isFoundMarkersShown: isFoundMarkersShown,
        });
    }

    handleMarkButtonClick = (marker = {}) => (event) => {

        this.setState((prevState) => {
            const index = prevState.markers.findIndex((item) => item.id === marker.id);

            if (index === -1) {
                return {};
            }

            const oldMarker = prevState.markers[index] || {};

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
     *
     * @param {Object} marker
     */
    updateLocalStorageMarker = (marker = {}) => {
        const localStorageMarkersJson= window.localStorage.getItem('markers') || '[]';

        const localStorageMarkers = [...JSON.parse(localStorageMarkersJson)];

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

    handleShowFoundMarkersClick = () => {

        this.setState((prevState) => {

            const newState = !prevState.isFoundMarkersShown;

            window.localStorage.setItem('isFoundMarkersShown', newState ? '1' : '0');

            return {
                isFoundMarkersShown: newState,
            };
        });

    };

    /**
     * Only show the currently clicked marker type.
     *
     * @param {String} type
     */
    handleTypeClick = (type) => () => {

        this.setState((prevState) => {

            const newMarkers = [...prevState.markers].map((marker) => {
                return {
                    ...marker,
                    isHidden: marker.type !== type,
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
    handleShowAllClick = () => {

        this.setState((prevState) => {

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

    render() {

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
                />

                <MojaveWastelandMap
                    className="app__mojave-wasteland-map"
                    markers={this.state.markers}
                    onMarkButtonClick={this.handleMarkButtonClick}
                    isFoundMarkersShown={this.state.isFoundMarkersShown}
                />

            </div>

        );

    }

}

export default App;

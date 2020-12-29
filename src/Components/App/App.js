import React, { Component } from 'react';
import './App.css';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';
import markers from 'Data/markers.json';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: markers,
        };
    }

    handleMarkButtonClick = (marker = {}) => (event) => {

        this.setState((prevState) => {
            const index = prevState.markers.findIndex((item) => item.id === marker.id);

            if (index === -1) {
                return {};
            }

            const oldMarker = prevState.markers[index] || {};

            const newMarkers = [...prevState.markers];

            newMarkers[index] = {
                ...oldMarker,
                isFound: !oldMarker.isFound,
            };

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

                <MojaveWastelandMap
                    className="app__mojave-wasteland-map"
                    markers={this.state.markers}
                    onMarkButtonClick={this.handleMarkButtonClick}
                />

            </div>

        );

    }

}

export default App;

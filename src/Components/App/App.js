import React from 'react';
import './App.css';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';
import markers from 'Data/markers.json';

const App = (props) => {

    return (

        <div
            className="app"
        >

            <MojaveWastelandMap
                className="app__mojave-wasteland-map"
                markers={markers}
            />

        </div>

    );

};

export default App;

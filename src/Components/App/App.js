import React from 'react';
import './App.css';
import MojaveWastelandMap from 'Components/MojaveWastelandMap/MojaveWastelandMap';

const App = (props) => {

    return (

        <div
            className="app"
        >

            <MojaveWastelandMap
                className="app__mojave-wasteland-map"
            />

        </div>

    );

};

export default App;

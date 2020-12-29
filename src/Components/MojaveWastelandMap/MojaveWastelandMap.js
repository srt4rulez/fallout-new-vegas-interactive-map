import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MojaveWastelandMap.css';
import {
    MapContainer,
    ImageOverlay,
} from 'react-leaflet';
import * as L from 'leaflet';
import mojaveWastelandMapImageSrc from './mojave-wasteland-map.jpg';
import MojaveWastelandMarker from 'Components/MojaveWastelandMarker/MojaveWastelandMarker';

const propTypes = {
    className: PropTypes.string,
    markers: PropTypes.array,
    onMarkButtonClick: PropTypes.func,
};

const defaultProps = {
    className: '',
    markers: [],
    onMarkButtonClick: (marker = {}) => (event) => {},
};

/**
 * @type {Object}
 *
 * @see https://react-leaflet.js.org/docs/api-map#mapcontainer
 *
 * These props are immutable.
 */
const mapOptions = {
    maxZoom: 4,
    crs: L.CRS.Simple,
    bounds: [
        [0, 0],
        [1024, 1024], // for now, this is just the size of the map image.
    ],
};

const MojaveWastelandMap = (props) => {

    return (

        <MapContainer
            className={classNames([
                'mojave-wasteland-map',
                props.className,
            ])}
            {...mapOptions}
        >

            <ImageOverlay
                url={mojaveWastelandMapImageSrc}
                bounds={mapOptions.bounds}
            />

            {props.markers.map((marker) => {

                if (!marker.lat || !marker.lng) {
                    return null;
                }

                return (

                    <MojaveWastelandMarker
                        key={marker.id}
                        lat={marker.lat}
                        lng={marker.lng}
                        isFound={marker.isFound}
                        url={marker.url}
                        title={marker.title}
                        desc={marker.desc}
                        imgSrc={marker.imgSrc}
                        onMarkButtonClick={props.onMarkButtonClick(marker)}
                    />

                );

            })}

        </MapContainer>

    );

};

MojaveWastelandMap.propTypes = propTypes;
MojaveWastelandMap.defaultProps = defaultProps;

export default MojaveWastelandMap;

import * as React from 'react';
import classNames from 'classnames';
import './MojaveWastelandMap.scss';
import {
    MapContainer,
    ImageOverlay,
} from 'react-leaflet';
import type {
    MapContainerProps,
} from 'react-leaflet';
import * as L from 'leaflet';
import mojaveWastelandMapImageSrc from './mojave-wasteland-map.jpg';
import MojaveWastelandMarker from 'Components/MojaveWastelandMarker/MojaveWastelandMarker';
import type { MojaveWastelandMarkerProps } from 'Components/MojaveWastelandMarker/MojaveWastelandMarker';
import type {
    MarkerInterface,
} from 'types';

const bounds = new L.LatLngBounds({
    lat: 0,
    lng: 0,
}, {
    // for now, this is just the size of the map image.
    lat: 1024,
    lng: 1024
});

export interface MojaveWastelandMapProps {
    className?: string;
    markers?: Array<MarkerInterface>;
    onMarkButtonClick?: (marker: MarkerInterface) => MojaveWastelandMarkerProps['onMarkButtonClick'];
    isFoundMarkersShown?: boolean;
    onMapCreation?: MapContainerProps['whenCreated'];
    onMarkerAdd?: MojaveWastelandMarkerProps['onAdd'];
}

const MojaveWastelandMap = ({
    className = '',
    markers = [],
    onMarkButtonClick = undefined,
    isFoundMarkersShown = true,
    onMapCreation = undefined,
    onMarkerAdd = undefined,
}: MojaveWastelandMapProps): JSX.Element => {

    return (

        <MapContainer
            className={classNames([
                'mojave-wasteland-map',
                className,
            ])}
            maxZoom={4}
            crs={L.CRS.Simple}
            bounds={bounds}
            whenCreated={onMapCreation} // eslint-disable-line react/jsx-handler-names
        >

            <ImageOverlay
                url={mojaveWastelandMapImageSrc}
                bounds={bounds}
            />

            {markers && markers.map((marker) => {

                if (!marker.lat || !marker.lng) {
                    return null;
                }

                // Don't render found items.
                if (!isFoundMarkersShown && marker.isFound) {
                    return null;
                }

                if (marker.isHidden) {
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
                        onMarkButtonClick={onMarkButtonClick ? onMarkButtonClick(marker) : undefined}
                        type={marker.type}
                        subType={marker.subType}
                        onAdd={onMarkerAdd}
                    />

                );

            })}

        </MapContainer>

    );

};

export default MojaveWastelandMap;

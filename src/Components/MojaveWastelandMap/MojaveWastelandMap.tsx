import * as React from 'react';
import classNames from 'classnames';
import './MojaveWastelandMap.scss';
import {
    MapContainer,
    ImageOverlay,
} from 'react-leaflet';
import * as L from 'leaflet';
import mojaveWastelandMapImageSrc from './mojave-wasteland-map.jpg';
import MojaveWastelandMarker from 'Components/MojaveWastelandMarker/MojaveWastelandMarker';
import type { MojaveWastelandMarkerProps } from 'Components/MojaveWastelandMarker/MojaveWastelandMarker';
import type {
    MarkerInterface,
} from 'types';
import {
    selectIsFoundMarkersShown,
    selectMarkers,
    toggleMarkerAsFound,
} from 'Slices/appSlice';
import {
    useAppDispatch,
    useAppSelector,
} from 'hooks';

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
    onMarkerAdd?: (marker: MarkerInterface) => MojaveWastelandMarkerProps['onAdd'];
}

const MojaveWastelandMap = ({
    className = '',
    onMarkerAdd = undefined,
}: MojaveWastelandMapProps): JSX.Element => {

    const isFoundMarkersShown = useAppSelector(selectIsFoundMarkersShown);

    const markers = useAppSelector(selectMarkers);

    const dispatch = useAppDispatch();

    const handleMarkButtonClick = (marker: MarkerInterface): () => void => React.useCallback((): void => {
        dispatch(toggleMarkerAsFound(marker));
    }, []);

    return (

        <MapContainer
            className={classNames([
                'mojave-wasteland-map',
                className,
            ])}
            maxZoom={4}
            crs={L.CRS.Simple}
            bounds={bounds}
        >

            <ImageOverlay
                url={mojaveWastelandMapImageSrc}
                bounds={bounds}
            />

            {markers && markers.map((marker) => {

                // Must move these before the null returns to avoid difference in hooks calls.
                const onAdd = onMarkerAdd ? onMarkerAdd(marker) : undefined;
                const onMarkButtonClick = handleMarkButtonClick(marker);

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
                        onMarkButtonClick={onMarkButtonClick}
                        type={marker.type}
                        subType={marker.subType}
                        onAdd={onAdd}
                    />

                );

            })}

        </MapContainer>

    );

};

export default MojaveWastelandMap;

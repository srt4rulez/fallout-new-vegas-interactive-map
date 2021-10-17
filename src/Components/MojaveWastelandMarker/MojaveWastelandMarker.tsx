import * as React from 'react';
import classNames from 'classnames';
import './MojaveWastelandMarker.scss';
import {
    Marker,
    Popup,
} from 'react-leaflet';
import * as L from 'leaflet';
import DOMPurify from 'dompurify';
import {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookLabelMap,
    MarkerInterface,
} from 'types';

export interface MojaveWastelandMarkerProps extends MarkerInterface {
    // className?: string;
    onMarkButtonClick?: React.ChangeEventHandler;
    onAdd?: L.LeafletEventHandlerFn;
}

const MojaveWastelandMarker = ({
    // className = '',
    isFound = false,
    url = '',
    title = '',
    desc = '',
    imgSrc = '',
    lat = 0,
    lng = 0,
    onMarkButtonClick = undefined,
    type,
    subType,
    onAdd = undefined,
}: MojaveWastelandMarkerProps): JSX.Element => {

    const iconSizeX = 25.5;
    const iconSizeY = 34; // update this value first, then check width for setting X.

    const icon = L.divIcon({
        className: 'mojave-wasteland-marker__icon-wrapper',
        html: `
            <i
                class="mojave-wasteland-marker__icon fas fa-map-marker-alt ${type ? `has-text-${typeColorMap[type]}` : ''}"
                style="font-size: ${iconSizeY}px;"
            />
        `,
        iconSize: [
            iconSizeX,
            iconSizeY,
        ],
        iconAnchor: [
            (iconSizeX / 2), // assuming the "pin" of the icon is in the middle of the icon.
            iconSizeY,
        ],
        popupAnchor: [
            0,
            (-(iconSizeY) - 3), // 3 = spacing between icon and popup arrow.
        ],
    });

    return (

        <Marker
            // className={classNames([
            //     'mojave-wasteland-marker',
            //     className,
            // ])}
            position={[lat, lng]}
            opacity={isFound ? 0.5 : 1}
            icon={icon}
            eventHandlers={{
                add: onAdd,
            }}
        >

            <Popup
                maxWidth={350}
            >

                <h2
                    className="title is-4"
                >

                    <a
                        href={url}
                        rel="noreferrer"
                        target="_blank"
                    >

                        {type === typeMap.SkillBook && subTypeSkillBookLabelMap[subType] && `${subTypeSkillBookLabelMap[subType]} - `}

                        {title}

                    </a>

                </h2>

                {type && typeLabelMap[type] && (

                    <div
                        className="tags has-addons is-justify-content-center"
                    >

                        <span
                            className="tag is-dark mb-0"
                        >
                            type
                        </span>

                        <span
                            className={classNames([
                                'tag',
                                'mb-0',
                                'is-lowercase',
                                `is-${typeColorMap[type]}`,
                            ])}
                        >
                            {typeLabelMap[type]}
                        </span>

                    </div>

                )}

                {desc && (

                    <p
                        className={classNames('mojave-wasteland-marker__desc', 'content')}
                        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                            __html: DOMPurify.sanitize(desc),
                        }}
                    />

                )}

                {imgSrc && (

                    <figure
                        className="image block"
                    >

                        <img
                            src={imgSrc}
                            alt={title}
                        />

                    </figure>

                )}

                <label
                    className="checkbox button is-fullwidth"
                >

                    <input
                        className="mr-1"
                        onChange={onMarkButtonClick}
                        type="checkbox"
                        checked={isFound}
                    />

                    {' '}

                    Mark As Found

                </label>

            </Popup>

        </Marker>

    );

};

export default MojaveWastelandMarker;

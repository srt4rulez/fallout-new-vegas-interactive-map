import React from 'react';
import PropTypes from 'prop-types';
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
} from 'Data/marker-types';

const propTypes = {
    className: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    isFound: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    imgSrc: PropTypes.string,
    onMarkButtonClick: PropTypes.func,
    type: PropTypes.oneOf(Object.values(typeMap)),
    subType: PropTypes.string,
    onAdd: PropTypes.func,
};

const defaultProps = {
    className: '',
    isFound: false,
    url: '',
    title: '',
    desc: '',
    imgSrc: '',
    onMarkButtonClick: (event) => {},
    type: '',
    subType: '',
    onAdd: () => {},
};

const MojaveWastelandMarker = (props) => {

    const iconSizeX = 25.5;
    const iconSizeY = 34; // update this value first, then check width for setting X.

    const icon = L.divIcon({
        className: 'mojave-wasteland-marker__icon-wrapper',
        html: `
            <i
                class="mojave-wasteland-marker__icon fas fa-map-marker-alt has-text-${typeColorMap[props.type]}"
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
            className={classNames([
                'mojave-wasteland-marker',
                props.className,
            ])}
            position={[props.lat, props.lng]}
            opacity={props.isFound ? 0.5 : 1}
            icon={icon}
            eventHandlers={{
                add: props.onAdd,
            }}
        >

            <Popup
                maxWidth={350}
            >

                <h2
                    className="title is-4"
                >

                    <a
                        href={props.url}
                        rel="noreferrer"
                        target="_blank"
                    >

                        {props.type === typeMap.SkillBook && subTypeSkillBookLabelMap[props.subType] && `${subTypeSkillBookLabelMap[props.subType]} - `}

                        {props.title}

                    </a>

                </h2>

                {typeLabelMap[props.type] && (

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
                                `is-${typeColorMap[props.type]}`,
                            ])}
                        >
                            {typeLabelMap[props.type]}
                        </span>

                    </div>

                )}

                {props.desc && (

                    <p
                        className={classNames('mojave-wasteland-marker__desc', 'content')}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(props.desc),
                        }}
                    />

                )}

                {props.imgSrc && (

                    <figure
                        className="image block"
                    >

                        <img
                            src={props.imgSrc}
                            alt={props.title}
                        />

                    </figure>

                )}

                <label
                    className="checkbox button is-fullwidth"
                >

                    <input
                        className="mr-1"
                        onChange={props.onMarkButtonClick}
                        type="checkbox"
                        checked={props.isFound}
                    />

                    Mark As Found

                </label>

            </Popup>

        </Marker>

    );

};

MojaveWastelandMarker.propTypes = propTypes;
MojaveWastelandMarker.defaultProps = defaultProps;

export default MojaveWastelandMarker;

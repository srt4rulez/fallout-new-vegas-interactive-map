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
    type: PropTypes.string,
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
};

const typeLabelMap = {
    'snow_globe': 'snow globe',
    'skill_book': 'skill book',
    'unique_weapon': 'unique weapon',
};

// Based on bulma css color types.
// TODO: Move to separate file.
const typeColorMap = {
    'snow_globe': 'link',
    'skill_book': 'warning',
    'unique_weapon': 'primary',
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
        >

            <Popup>

                <h2
                    className="title is-4"
                >
                    <a
                        href={props.url}
                        rel="noreferrer"
                        target="_blank"
                    >
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
                                `is-${typeColorMap[props.type]}`,
                            ])}
                        >
                            {typeLabelMap[props.type]}
                        </span>

                    </div>

                )}

                {props.desc && (

                    <p
                        className="content"
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

                <button
                    className="button is-fullwidth"
                    type="button"
                    onClick={props.onMarkButtonClick}
                >

                    {props.isFound ? 'Mark As Not Found' : 'Mark As Found'}

                </button>

            </Popup>

        </Marker>

    );

};

MojaveWastelandMarker.propTypes = propTypes;
MojaveWastelandMarker.defaultProps = defaultProps;

export default MojaveWastelandMarker;

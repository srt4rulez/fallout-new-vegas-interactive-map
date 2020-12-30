import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MojaveWastelandMarker.scss';
import {
    Marker,
    Popup,
} from 'react-leaflet';
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
};

const defaultProps = {
    className: '',
    isFound: false,
    url: '',
    title: '',
    desc: '',
    imgSrc: '',
    onMarkButtonClick: (event) => {},
};

const MojaveWastelandMarker = (props) => {

    return (

        <Marker
            className={classNames([
                'mojave-wasteland-marker',
                props.className,
            ])}
            position={[props.lat, props.lng]}
            opacity={props.isFound ? 0.5 : 1}
        >

            <Popup>

                <h2>
                    <a
                        href={props.url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {props.title}
                    </a>
                </h2>

                {props.desc && (

                    <p
                        className="mojave-wasteland-marker__popup-desc"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(props.desc),
                        }}
                    />

                )}

                {props.imgSrc && (

                    <img
                        className="mojave-wasteland-marker__popup-img"
                        src={props.imgSrc}
                        alt={props.title}
                    />

                )}

                <button
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

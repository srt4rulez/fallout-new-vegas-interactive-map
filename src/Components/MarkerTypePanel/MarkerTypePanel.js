import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MarkerTypePanel.scss';
import {
    typeMap,
    typeLabelMap,
    typeColorMap,
} from 'Data/marker-types';

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.values(typeMap)),
    markers: PropTypes.array,
    onMarkButtonClick: PropTypes.func,
    onTypeClick: PropTypes.func,
    onMarkerTitleClick: PropTypes.func,
};

const defaultProps = {
    className: '',
    type: '',
    markers: [],
    onMarkButtonClick: (marker = {}) => (event) => {},
    onTypeClick: (event) => {},
    onMarkerTitleClick: (marker = {}) => (event) => {},
};

const MarkerTypePanel = (props) => {

    return (

        <section
            className={classNames([
                'marker-type-panel',
                props.className,
            ])}
        >

            <header
                className={classNames('marker-type-panel__header')}
            >

                <i
                    className={classNames([
                        'marker-type-panel__icon',
                        'fas',
                        'fa-map-marker-alt',
                        `has-text-${typeColorMap[props.type]}`,
                    ])}
                />

                <button
                    type="button"
                    className={classNames('marker-type-panel__header-btn')}
                    title="Only show this marker type"
                    onClick={props.onTypeClick}
                >

                    {typeLabelMap[props.type] || 'Misc'}

                </button>

            </header>

            <ul
                className={classNames('marker-type-panel__list')}
            >

                {props.markers.map((marker) => {

                    return (

                        <li
                            key={marker.id}
                            className={classNames('marker-type-panel__list-item')}
                        >

                            <input
                                className={classNames('marker-type-panel__item-checkbox')}
                                type="checkbox"
                                checked={marker.isFound}
                                onChange={props.onMarkButtonClick(marker)}
                                title="Mark As Found"
                            />

                            <button
                                className={classNames('marker-type-panel__item-link')}
                                onClick={props.onMarkerTitleClick(marker)}
                            >

                                {marker.title}

                            </button>

                        </li>

                    );

                })}

            </ul>

        </section>

    );

};

MarkerTypePanel.propTypes = propTypes;
MarkerTypePanel.defaultProps = defaultProps;

export default MarkerTypePanel;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MarkerTypePanel.scss';
import {
    typeLabelMap,
    typeColorMap,
} from 'Data/marker-types';

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.string, // TODO
    markers: PropTypes.array,
    onMarkButtonClick: PropTypes.func,
};

const defaultProps = {
    className: '',
    type: '',
    markers: [],
    onMarkButtonClick: (marker = {}) => (event) => {},
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

                {typeLabelMap[props.type] || 'Misc'}

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
                            />

                            <button
                                className={classNames('marker-type-panel__item-link')}
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

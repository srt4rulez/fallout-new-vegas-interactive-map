import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MarkerTypePanel.scss';

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.string, // TODO
    markers: PropTypes.array,
};

const defaultProps = {
    className: '',
    type: '',
    markers: [],
};

const typeLabelMap = {
    'snow_globe': 'Snow Globes',
    'skill_book': 'Skill Books',
    'unique_weapon': 'Unique Weapons',
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

                {typeLabelMap[props.type] || 'Misc'}

            </header>

            <ul
                className={classNames('marker-type-panel__list')}
            >

                {props.markers.map((marker) => {

                    return (

                        <li
                            className={classNames('marker-type-panel__list-item')}
                        >

                            <a
                                className={classNames('marker-type-panel__item-link')}
                            >

                                {marker.title}

                            </a>

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

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MarkerTypePanel.scss';
import {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookLabelMap,
} from 'Data/marker-types';
import MarkerListItem from 'Components/MarkerListItem/MarkerListItem';

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

const typesThatHaveSubTypes = [
    typeMap.SkillBook,
];

const MarkerTypePanel = (props) => {

    const markers = props.markers;

    const hasSubTypes = typesThatHaveSubTypes.includes(props.type);

    const subTypes = {};

    if (hasSubTypes) {
        markers.forEach((marker) => {
            if (subTypes[marker.sub_type]) {
                // Already a object, just add the new marker to markers.
                subTypes[marker.sub_type].markers.push(marker);
            } else {
                // Create object for sub type
                subTypes[marker.sub_type] = {
                    id: marker.sub_type,
                    markers: [marker],
                };
            }
        });
    }

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

                {(hasSubTypes) ? Object.values(subTypes).map((subType) => {

                    return (

                        <li
                            className={classNames('marker-type-panel__sub-type-list-item')}
                            key={subType.id}
                        >

                            <span
                                className={classNames('marker-type-panel__sub-type-label')}
                            >

                                {subTypeSkillBookLabelMap[subType.id]}

                            </span>

                            <ul>

                                {subType.markers.map((marker) => {

                                    return (

                                        <MarkerListItem
                                            tag="li"
                                            key={marker.id}
                                            isFound={marker.isFound}
                                            onMarkCheckboxChange={props.onMarkButtonClick(marker)}
                                            onMarkerTitleClick={props.onMarkerTitleClick(marker)}
                                            title={marker.title}
                                        />

                                    );

                                })}

                            </ul>

                        </li>

                    );

                }) : props.markers.map((marker) => {

                    return (

                        <MarkerListItem
                            tag="li"
                            key={marker.id}
                            isFound={marker.isFound}
                            onMarkCheckboxChange={props.onMarkButtonClick(marker)}
                            onMarkerTitleClick={props.onMarkerTitleClick(marker)}
                            title={marker.title}
                        />

                    );

                })}

            </ul>

        </section>

    );

};

MarkerTypePanel.propTypes = propTypes;
MarkerTypePanel.defaultProps = defaultProps;

export default MarkerTypePanel;

import * as React from 'react';
import classNames from 'classnames';
import './MarkerTypePanel.scss';
import {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookLabelMap,
    Marker,
    MarkerTypes,
    MarkerSubtypes,
} from 'Data/marker-types';
import MarkerListItem from 'Components/MarkerListItem/MarkerListItem';

const typesThatHaveSubTypes: Array<string> = [
    typeMap.SkillBook,
];

interface MarkerTypePanelProps {
    className?: string;
    type?: MarkerTypes;
    markers: Array<Marker>;
    onMarkButtonClick?: (marker: Marker) => (event: React.SyntheticEvent) => void;
    onTypeClick?: (event: React.MouseEvent) => void;
    onMarkerTitleClick?: (marker: Marker) => (event: React.SyntheticEvent) => void;
}

const MarkerTypePanel = ({
    className = '',
    type = undefined,
    markers = [],
    onMarkButtonClick = undefined,
    onTypeClick = undefined,
    onMarkerTitleClick = undefined,
}: MarkerTypePanelProps) => {

    const hasSubTypes = type ? typesThatHaveSubTypes.includes(type) : false;

    const subTypes: {
        [index: string]: {
            id: MarkerSubtypes;
            markers: Array<Marker>;
        };
    } = {};

    if (hasSubTypes) {
        markers.forEach((marker) => {
            const subType = subTypes[marker.sub_type];

            if (subType) {
                // Already a object, just add the new marker to markers.
                subType.markers.push(marker);
            } else {
                // Create object for sub type
                subTypes[marker.sub_type] = {
                    id: marker.sub_type,
                    markers: [marker],
                };
            }
        });
    }

    const renderMarkerListItem = (marker: Marker): JSX.Element => {

        return (

            <MarkerListItem
                tag="li"
                key={marker.id}
                isFound={marker.isFound}
                onMarkCheckboxChange={onMarkButtonClick ? onMarkButtonClick(marker) : undefined}
                onMarkerTitleClick={onMarkerTitleClick ? onMarkerTitleClick(marker) : undefined}
                title={marker.title}
            />

        );

    };

    return (

        <section
            className={classNames([
                'marker-type-panel',
                className,
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
                        type ? `has-text-${typeColorMap[type]}` : '',
                    ])}
                />

                <button
                    type="button"
                    className={classNames('marker-type-panel__header-btn')}
                    title="Only show this marker type"
                    onClick={onTypeClick}
                >

                    {type ? typeLabelMap[type] : 'Misc'}

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

                                {/* TODO: Handle other sub types */}
                                {subTypeSkillBookLabelMap[subType.id]}

                            </span>

                            <ul>

                                {subType.markers.map((marker) => renderMarkerListItem(marker))}

                            </ul>

                        </li>

                    );

                }) : markers.map((marker) => renderMarkerListItem(marker))}

            </ul>

        </section>

    );

};

export default MarkerTypePanel;
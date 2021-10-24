import * as React from 'react';
import classNames from 'classnames';
import './MarkerTypePanel.scss';
import {
    typesThatHaveSubTypes,
    typeLabelMap,
    typeColorMapChakra,
    subTypeSkillBookLabelMap,
} from 'types';
import type {
    MarkerInterface,
    MarkerType,
    MarkerSubtype,
} from 'types';
import MarkerListItem from 'Components/MarkerListItem/MarkerListItem';
import type { MarkerListItemProps } from 'Components/MarkerListItem/MarkerListItem';
import {
    Box,
    Button,
    List,
    ListItem,
    Tooltip,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export interface MarkerTypePanelProps {
    className?: string;
    type?: MarkerType;
    markers: Array<MarkerInterface>;
    onMarkButtonClick?: (marker: MarkerInterface) => MarkerListItemProps['onMarkCheckboxChange'];
    onTypeClick?: React.DOMAttributes<Element>['onClick'];
    onMarkerTitleClick?: (marker: MarkerInterface) => MarkerListItemProps['onMarkerTitleClick'];
}

const MarkerTypePanel = ({
    className = '',
    type = undefined,
    markers = [],
    onMarkButtonClick = undefined,
    onTypeClick = undefined,
    onMarkerTitleClick = undefined,
}: MarkerTypePanelProps): JSX.Element => {

    const hasSubTypes = type ? typesThatHaveSubTypes.includes(type) : false;

    const subTypes: {
        [index: string]: {
            id: MarkerSubtype;
            markers: Array<MarkerInterface>;
        };
    } = {};

    if (hasSubTypes) {
        markers.forEach((marker) => {
            if (!marker.subType) {
                return;
            }
            const subType = subTypes[marker.subType];

            if (subType) {
                // Already a object, just add the new marker to markers.
                subType.markers.push(marker);
            } else {
                // Create object for sub type
                subTypes[marker.subType] = {
                    id: marker.subType,
                    markers: [marker],
                };
            }
        });
    }

    const renderMarkerListItem = (marker: MarkerInterface): JSX.Element => {

        return (

            <MarkerListItem
                tag={ListItem}
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

                <Box
                    // color will be inherited from FontAwesomeIcon
                    color={type ? typeColorMapChakra[type] : undefined}
                    className={classNames([
                        'marker-type-panel__icon',
                    ])}
                >

                    <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                    />

                </Box>

                <Tooltip
                    label="Only show this marker type"
                    placement="top"
                    hasArrow={true}
                    openDelay={500}
                >

                    <Button
                        variant="link"
                        colorScheme="blue"
                        className={classNames('marker-type-panel__header-btn')}
                        onClick={onTypeClick}
                    >

                        {type ? typeLabelMap[type] : 'Misc'}

                    </Button>

                </Tooltip>

            </header>

            <List
                className={classNames('marker-type-panel__list')}
            >

                {(hasSubTypes) ? Object.values(subTypes).map((subType) => {

                    return (

                        <ListItem
                            className={classNames('marker-type-panel__sub-type-list-item')}
                            key={subType.id}
                        >

                            <span
                                className={classNames('marker-type-panel__sub-type-label')}
                            >

                                {/* TODO: Handle other sub types */}
                                {subTypeSkillBookLabelMap[subType.id]}

                            </span>

                            <List>

                                {subType.markers.map((marker) => renderMarkerListItem(marker))}

                            </List>

                        </ListItem>

                    );

                }) : markers.map((marker) => renderMarkerListItem(marker))}

            </List>

        </section>

    );

};

export default MarkerTypePanel;

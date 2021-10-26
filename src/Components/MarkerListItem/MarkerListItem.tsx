import * as React from 'react';
import classNames from 'classnames';
import './MarkerListItem.scss';
import {
    Button,
    Checkbox,
    Tooltip,
} from '@chakra-ui/react';

export interface MarkerListItemProps {
    tag?: React.ComponentType | keyof JSX.IntrinsicElements;
    className?: string;
    isFound?: boolean;
    onMarkCheckboxChange?: React.InputHTMLAttributes<Element>['onChange'];
    onMarkerTitleClick?: React.DOMAttributes<Element>['onClick'];
    title?: string;
}

const MarkerListItem = ({
    tag = 'li',
    className = '',
    isFound = false,
    onMarkCheckboxChange = undefined,
    onMarkerTitleClick = undefined,
    title = '',
}: MarkerListItemProps = {}): JSX.Element => {

    const Tag = tag;

    return (

        <Tag
            className={classNames([
                'marker-list-item',
                className,
            ])}
        >

            <Checkbox
                className={classNames('marker-list-item__found-checkbox')}
                isChecked={isFound}
                onChange={onMarkCheckboxChange}
                colorScheme="blue"
                size="lg"
            />

            <Tooltip
                label="Jump to Marker"
                placement="top"
                hasArrow={true}
                openDelay={500}
            >

                <Button
                    onClick={onMarkerTitleClick}
                    size="md"
                    variant="link"
                    colorScheme="blue"
                    fontWeight="normal"
                    wordBreak="break-all"
                    whiteSpace="unset"
                    textAlign="left"
                >

                    {title}

                </Button>

            </Tooltip>

        </Tag>

    );

};

export default MarkerListItem;

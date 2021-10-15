import * as React from 'react';
import classNames from 'classnames';
import './MarkerListItem.scss';

interface MarkerListItemProps {
    tag?: React.ComponentType | keyof JSX.IntrinsicElements;
    className?: string;
    isFound?: boolean;
    onMarkCheckboxChange?: (event: React.ChangeEvent) => void;
    onMarkerTitleClick?: (event: React.MouseEvent) => void;
    title?: string;
}

const MarkerListItem = ({
    tag = 'li',
    className = '',
    isFound = false,
    onMarkCheckboxChange = undefined,
    onMarkerTitleClick = undefined,
    title = '',
}: MarkerListItemProps = {}) => {

    const Tag = tag;

    return (

        <Tag
            className={classNames([
                'marker-list-item',
                className,
            ])}
        >

            <input
                className={classNames('marker-list-item__found-checkbox')}
                type="checkbox"
                checked={isFound}
                onChange={onMarkCheckboxChange}
                title="Mark As Found"
            />

            <button
                type="button"
                className={classNames('marker-list-item__button')}
                onClick={onMarkerTitleClick}
            >

                {title}

            </button>

        </Tag>

    );

};

export default MarkerListItem;

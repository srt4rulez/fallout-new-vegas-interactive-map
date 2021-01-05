import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './MarkerListItem.scss';

const propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    isFound: PropTypes.bool,
    onMarkCheckboxChange: PropTypes.func,
    onMarkerTitleClick: PropTypes.func,
    title: PropTypes.string,
};

const defaultProps = {
    tag: 'li',
    className: '',
    isFound: false,
    onMarkCheckboxChange: (event) => {},
    onMarkerTitleClick: (event) => {},
    title: '',
};

const MarkerListItem = (props) => {

    const Tag = props.tag;

    return (

        <Tag
            className={classNames([
                'marker-list-item',
                props.className,
            ])}
        >

            <input
                className={classNames('marker-list-item__found-checkbox')}
                type="checkbox"
                checked={props.isFound}
                onChange={props.onMarkCheckboxChange}
                title="Mark As Found"
            />

            <button
                className={classNames('marker-list-item__button')}
                onClick={props.onMarkerTitleClick}
            >

                {props.title}

            </button>

        </Tag>

    );

};

MarkerListItem.propTypes = propTypes;
MarkerListItem.defaultProps = defaultProps;

export default MarkerListItem;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SettingsPanel.scss';
import FalloutNVLogoImageSrc from './fallout-nv-logo.png';
import MarkerTypePanel from 'Components/MarkerTypePanel/MarkerTypePanel';

const propTypes = {
    className: PropTypes.string,
    markers: PropTypes.array,
};

const defaultProps = {
    className: '',
    markers: [],
};

const SettingsPanel = (props) => {

    const skillBookMarkers = props.markers.filter((marker) => marker.type === 'skill_book');
    const snowGlobeMarkers = props.markers.filter((marker) => marker.type === 'snow_globe');
    const uniqueWeaponMarkers = props.markers.filter((marker) => marker.type === 'unique_weapon');

    return (

        <section
            className={classNames([
                'settings-panel',
                'box',
                props.className,
            ])}
        >

            <header
                className={classNames('settings-panel__header')}
            >

                <figure
                    className={classNames('settings-panel__logo', 'image')}
                >

                    <img
                        src={FalloutNVLogoImageSrc}
                        alt="Fallout: New Vegas Logo"
                    />

                </figure>

                <h2
                    className="title is-2"
                >
                    Interactive Map
                </h2>

            </header>

            <div
                className={classNames('settings-panel__content')}
            >

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type="skill_book"
                    markers={skillBookMarkers}
                />

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type="snow_globe"
                    markers={snowGlobeMarkers}
                />

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type="unique_weapon"
                    markers={uniqueWeaponMarkers}
                />

            </div>

            <footer
                className={classNames('settings-panel__footer')}
            >

                Created By

                {' '}

                <a
                    href="https://github.com/srt4rulez"
                    rel="noreferrer"
                    target="_blank"
                >
                    srt4rulez
                </a>

                {' | '}

                <a
                    href="https://github.com/srt4rulez/fallout-new-vegas-interactive-map"
                    rel="noreferrer"
                    target="_blank"
                >
                    View on Github
                </a>

            </footer>

        </section>

    );

};

SettingsPanel.propTypes = propTypes;
SettingsPanel.defaultProps = defaultProps;

export default SettingsPanel;

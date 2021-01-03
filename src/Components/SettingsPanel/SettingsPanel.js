import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SettingsPanel.scss';
import FalloutNVLogoImageSrc from './fallout-nv-logo.png';
import MarkerTypePanel from 'Components/MarkerTypePanel/MarkerTypePanel';
import { typeMap } from 'Data/marker-types';

const propTypes = {
    className: PropTypes.string,
    markers: PropTypes.array,
    onMarkButtonClick: PropTypes.func,
    isFoundMarkersShown: PropTypes.bool,
    onClickShowFoundMarkers: PropTypes.func,
    appVersion: PropTypes.string,
    onMarkerTitleClick: PropTypes.func,
};

const defaultProps = {
    className: '',
    markers: [],
    onMarkButtonClick: () => {},
    isFoundMarkersShown: true,
    onClickShowFoundMarkers: () => {},
    appVersion: '',
    onMarkerTitleClick: () => {},
};

const SettingsPanel = (props) => {

    const skillBookMarkers = props.markers.filter((marker) => marker.type === typeMap.SkillBook);
    const snowGlobeMarkers = props.markers.filter((marker) => marker.type === typeMap.SnowGlobe);
    const uniqueWeaponMarkers = props.markers.filter((marker) => marker.type === typeMap.UniqueWeapon);

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

                <div
                    className="buttons is-centered"
                >

                    <button
                        className="button"
                        type="button"
                        onClick={props.onShowAllClick}
                        title="Show all marker types"
                    >

                        <span
                            className="icon"
                        >

                            <i
                                className="far fa-eye"
                            />

                        </span>

                        <span>Show All Types</span>

                    </button>

                    <label
                        className="settings-panel__show-found-markers-btn checkbox button"
                        title="If checked, markers 'marked as found' will still appear on the map."
                    >

                        <input
                            className="mr-1"
                            type="checkbox"
                            checked={props.isFoundMarkersShown}
                            onChange={props.onClickShowFoundMarkers}
                        />

                        {' '}

                        Show Found Markers

                    </label>

                </div>

            </header>

            <div
                className={classNames('settings-panel__content')}
            >

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.SkillBook}
                    markers={skillBookMarkers}
                    onMarkButtonClick={props.onMarkButtonClick}
                    onTypeClick={props.onTypeClick(typeMap.SkillBook)}
                    onMarkerTitleClick={props.onMarkerTitleClick}
                />

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.SnowGlobe}
                    markers={snowGlobeMarkers}
                    onMarkButtonClick={props.onMarkButtonClick}
                    onTypeClick={props.onTypeClick(typeMap.SnowGlobe)}
                    onMarkerTitleClick={props.onMarkerTitleClick}
                />

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.UniqueWeapon}
                    markers={uniqueWeaponMarkers}
                    onMarkButtonClick={props.onMarkButtonClick}
                    onTypeClick={props.onTypeClick(typeMap.UniqueWeapon)}
                    onMarkerTitleClick={props.onMarkerTitleClick}
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

                v{props.appVersion}

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

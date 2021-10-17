import * as React from 'react';
import classNames from 'classnames';
import './SettingsPanel.scss';
import FalloutNVLogoImageSrc from './fallout-nv-logo.png';
import MarkerTypePanel from 'Components/MarkerTypePanel/MarkerTypePanel';
import {
    typeMap,
    MarkerInterface,
    MarkerType,
} from 'types';

export interface SettingsPanelProps {
    className?: string;
    markers: Array<MarkerInterface>;
    onMarkButtonClick?: (marker: MarkerInterface) => React.ChangeEventHandler;
    isFoundMarkersShown?: boolean;
    onClickShowFoundMarkers?: (event: React.ChangeEvent) => void;
    appVersion?: string;
    onMarkerTitleClick?: (marker: MarkerInterface) => React.MouseEventHandler;
    onShowAllClick?: (event: React.MouseEvent) => void;
    onTypeClick?: (type: MarkerType) => React.MouseEventHandler;
}

const SettingsPanel = ({
    className = '',
    markers = [],
    onMarkButtonClick = undefined,
    isFoundMarkersShown = false,
    onClickShowFoundMarkers = undefined,
    appVersion = '',
    onMarkerTitleClick = undefined,
    onShowAllClick = undefined,
    onTypeClick = () => () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    // ...props
}: SettingsPanelProps): JSX.Element => {

    const skillBookMarkers = markers.filter((marker) => marker.type === typeMap.SkillBook);
    const snowGlobeMarkers = markers.filter((marker) => marker.type === typeMap.SnowGlobe);

    return (

        <section
            className={classNames([
                'settings-panel',
                'box',
                className,
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
                        onClick={onShowAllClick}
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
                            checked={isFoundMarkersShown}
                            onChange={onClickShowFoundMarkers}
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
                    onMarkButtonClick={onMarkButtonClick}
                    onTypeClick={onTypeClick ? onTypeClick(typeMap.SkillBook) : undefined}
                    onMarkerTitleClick={onMarkerTitleClick}
                />

                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.SnowGlobe}
                    markers={snowGlobeMarkers}
                    onMarkButtonClick={onMarkButtonClick}
                    onTypeClick={onTypeClick ? onTypeClick(typeMap.SnowGlobe) : undefined}
                    onMarkerTitleClick={onMarkerTitleClick}
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

                v{appVersion}

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

export default SettingsPanel;

import * as React from 'react';
import ReactDomServer from 'react-dom/server';
import classNames from 'classnames';
import './MojaveWastelandMarker.scss';
import {
    Marker,
    Popup,
} from 'react-leaflet';
import * as L from 'leaflet';
import DOMPurify from 'dompurify';
import {
    typeMap,
    typeLabelMap,
    typeColorMap,
    typeColorScheme,
    subTypeSkillBookLabelMap,
} from 'types';
import type {
    MarkerInterface,
} from 'types';
import {
    Button,
    Checkbox,
    Link,
    Heading,
    Text,
    Badge,
    Image,
    Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export interface MojaveWastelandMarkerProps extends MarkerInterface {
    // className?: string;
    onMarkButtonClick?: React.DOMAttributes<Element>['onClick'];
    onAdd?: L.LeafletEventHandlerFn;
}

const MojaveWastelandMarker = ({
    // className = '',
    isFound = false,
    url = '',
    title = '',
    desc = '',
    imgSrc = '',
    lat = 0,
    lng = 0,
    onMarkButtonClick = undefined,
    type,
    subType,
    onAdd = undefined,
}: MojaveWastelandMarkerProps): JSX.Element => {

    const iconSizeX = 25.5;
    const iconSizeY = 34; // update this value first, then check width for setting X.

    const MarkerIcon = (
        <Box
            // color will be inherited from FontAwesomeIcon
            sx={{
                // use css variable directly
                color: type ? `var(--chakra-colors-${typeColorMap[type].replace('.', '-')})` : '',
            }}
            fontSize={iconSizeY}
            className={classNames([
                'mojave-wasteland-marker__icon',
            ])}
        >

            <FontAwesomeIcon
                icon={faMapMarkerAlt}
            />

        </Box>
    );

    const icon = L.divIcon({
        className: 'mojave-wasteland-marker__icon-wrapper',
        html: ReactDomServer.renderToStaticMarkup(MarkerIcon),
        iconSize: [
            iconSizeX,
            iconSizeY,
        ],
        iconAnchor: [
            (iconSizeX / 2), // assuming the "pin" of the icon is in the middle of the icon.
            iconSizeY,
        ],
        popupAnchor: [
            0,
            -(iconSizeY),
        ],
    });

    return (

        <Marker
            // className={classNames([
            //     'mojave-wasteland-marker',
            //     className,
            // ])}
            position={[lat, lng]}
            opacity={isFound ? 0.5 : 1}
            icon={icon}
            eventHandlers={{
                add: onAdd,
            }}
        >

            <Popup
                maxWidth={350}
            >

                <Box
                    // override leaflets font declaration
                    fontFamily="body"
                >

                    <Heading
                        as="h3"
                        size="lg"
                        marginBottom="4"
                    >

                        <Link
                            href={url}
                            isExternal={true}
                        >

                            {type === typeMap.SkillBook && subType && subTypeSkillBookLabelMap[subType] && `${subTypeSkillBookLabelMap[subType]} - `}

                            {title}

                        </Link>

                    </Heading>

                    <Badge
                        variant="solid"
                        marginLeft="2"
                        colorScheme={type ? typeColorScheme[type] : undefined}
                    >
                        {type && typeLabelMap[type]}
                    </Badge>

                    {desc && (

                        <Text
                            className={classNames('mojave-wasteland-marker__desc')}
                            dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                                __html: DOMPurify.sanitize(desc),
                            }}
                        />

                    )}

                    {imgSrc && (

                        <Image
                            src={imgSrc}
                            alt={title}
                            marginBottom="4"
                        />

                    )}

                    <Button
                        onClick={onMarkButtonClick}
                        width="100%"
                        variant="outline"
                        leftIcon={(
                            <Checkbox
                                isChecked={isFound}
                            />
                        )}
                        colorScheme="blue"
                    >

                        Mark As Found

                    </Button>

                </Box>

            </Popup>

        </Marker>

    );

};

export default MojaveWastelandMarker;

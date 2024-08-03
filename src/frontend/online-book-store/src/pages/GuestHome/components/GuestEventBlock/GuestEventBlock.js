import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GuestEventItem from '../GuestEventItem';
import { faBookOpen, faHandsAslInterpreting, faMicrophone } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

function GuestEventBlock() {
    const data = [
        {
            icon: <FontAwesomeIcon icon={faMicrophone} />,
            title: 'Events',
            description: 'Online and in shop, we host book launches, author signings, readings, and panel discussions.',
            color: 'rgba(93, 63, 211, .25)',
            route: '#EventsContent',
        },
        {
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            title: 'OUR HISTORY',
            description:
                'Our website have been constructed since 16 / 05 / 2024 with a lot of love and stories to supply the best experiences for our users.',
            color: 'rgba(0, 119, 255, .5)',
            route: config.routes.about,
        },
        {
            icon: <FontAwesomeIcon icon={faHandsAslInterpreting} />,
            title: 'OUR COMMUNITY',
            description:
                "We provide meeting space for community groups and resources. And you don't need to be a membership - anyone can join with us.",
            color: 'rgba(0, 255, 255, .33)',
            route: config.routes.about,
        },
    ];

    return data.map((item, index) => <GuestEventItem data={item} key={index} />);
}

export default GuestEventBlock;

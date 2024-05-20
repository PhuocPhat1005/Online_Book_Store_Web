import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventItem from '../EventItem';
import { faBookOpen, faHandsAslInterpreting, faMicrophone } from '@fortawesome/free-solid-svg-icons';

function EventBlock() {
    const data = [
        {
            icon: <FontAwesomeIcon icon={faMicrophone} />,
            title: 'Events',
            description: 'Online and in shop, we host book launches, author signings, readings, and panel discussions.',
            color: '#e8898e',
        },
        {
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            title: 'OUR HISTORY',
            description:
                'Our website have been constructed since 16 / 05 / 2024 with a lot of love and stories to supply the best experiences for our users.',
            color: 'var(--primary-color)',
        },
        {
            icon: <FontAwesomeIcon icon={faHandsAslInterpreting} />,
            title: 'OUR COMMUNITY',
            description:
                "We provide meeting space for community groups and resources. And you don't need to be a membership - anyone can join with us.",
            color: '#808080',
        },
    ];

    return data.map((item, index) => <EventItem data={item} key={index} />);
}

export default EventBlock;

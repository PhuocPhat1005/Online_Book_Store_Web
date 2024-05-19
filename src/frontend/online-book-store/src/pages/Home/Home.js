import classNames from 'classnames/bind';

import { HeaderContentLayout } from '~/components/Layouts';
import styles from './Home.module.scss';
import Slide from './components/Slide';

const cx = classNames.bind(styles);

const data = [
    'https://morgan-sindall-pztazn5y-media.s3.amazonaws.com/construction/images/OvCe_NCCLibrary_Early-Prieview-09-min.width-1600.jpg',
    'https://static.vecteezy.com/system/resources/previews/024/744/896/non_2x/a-modern-library-with-a-large-collection-of-textbooks-in-a-row-generated-by-ai-free-photo.jpg',
    'https://cdn.mos.cms.futurecdn.net/jUMGw45Kcj8vgLmnP7HZxP.jpg',
];

function Home() {
    return (
        <div>
            <HeaderContentLayout title="SIBooks" subtitle="The World of Books" />
            <Slide images={data} />
        </div>
    );
}

export default Home;

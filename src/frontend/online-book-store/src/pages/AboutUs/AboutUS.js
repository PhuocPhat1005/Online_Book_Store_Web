import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import ConnectedLine from '~/components/ConnectedLine';
import Image from '~/components/Image';
import SubHeaderContentLayout from '~/components/Layouts/SubHeaderContentLayout';
import Member from './components/Member';
import Slide from '~/components/Slide';

const cx = classNames.bind(styles);

const data = [
    'https://s2.dmcdn.net/v/U8sk11Z0PHreudG53/x1080',
    'https://www.desktopbackground.org/p/2011/02/23/161991_stephen-hawking-quotes-wallpapers_1024x658_h.jpg',
    'https://www.wallpaperflare.com/static/705/61/300/albert-einstein-history-science-quote-wallpaper.jpg',
];

function AboutUs() {
    return (
        <div className={cx('wrapper')}>
            <HeaderContentLayout title="About Us" subtitle="More than a just bookshop..." />
            <div className={cx('introduction')}>
                <div className={cx('content')}>
                    <Image
                        className={cx('picture')}
                        src="https://wallpapers.com/images/featured/library-06bevz1z3e3tya3r.jpg"
                        alt=""
                    />
                    <div className={cx('information')}>
                        <span className={cx('text')}>
                            Welcome to our online bookstore, where every click opens the door to a world of literary
                            wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                            heartwarming romances. Join our vibrant community of readers, where discussions and
                            recommendations abound. Let us guide you on your literary journey, helping you find the
                            perfect book to escape into. Welcome to a place where stories come to life, just a click
                            away.
                        </span>
                    </div>
                </div>
            </div>
            <ConnectedLine />
            <div className={cx('members')}>
                <SubHeaderContentLayout title="Our Members" />
                <div className={cx('members-container')}>
                    <Member
                        src="https://media.discordapp.net/attachments/1180385796994379798/1241786370469658644/IMG_0338.jpg?ex=664b772d&is=664a25ad&hm=20aeda7d1e6ab6e4da8c91f12fd4c089d082a1dc905d7e349025b382b2c0a843&=&format=webp&width=460&height=613"
                        alt=""
                        name="Tô Quốc Thanh"
                        description="Welcome to our online bookstore, where every click opens the door to a world of literary
                    wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                    heartwarming romances."
                    />
                    <Member
                        src="https://media.discordapp.net/attachments/1180385796994379798/1241786370469658644/IMG_0338.jpg?ex=664b772d&is=664a25ad&hm=20aeda7d1e6ab6e4da8c91f12fd4c089d082a1dc905d7e349025b382b2c0a843&=&format=webp&width=460&height=613"
                        alt=""
                        name="Tô Quốc Thanh"
                        description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                    />
                    <Member
                        src="https://media.discordapp.net/attachments/1180385796994379798/1241786370469658644/IMG_0338.jpg?ex=664b772d&is=664a25ad&hm=20aeda7d1e6ab6e4da8c91f12fd4c089d082a1dc905d7e349025b382b2c0a843&=&format=webp&width=460&height=613"
                        alt=""
                        name="Tô Quốc Thanh"
                        description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                    />
                    <Member
                        src="https://media.discordapp.net/attachments/1180385796994379798/1241786370469658644/IMG_0338.jpg?ex=664b772d&is=664a25ad&hm=20aeda7d1e6ab6e4da8c91f12fd4c089d082a1dc905d7e349025b382b2c0a843&=&format=webp&width=460&height=613"
                        alt=""
                        name="Tô Quốc Thanh"
                        description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                    />
                    <Member
                        src="https://media.discordapp.net/attachments/1180385796994379798/1241786370469658644/IMG_0338.jpg?ex=664b772d&is=664a25ad&hm=20aeda7d1e6ab6e4da8c91f12fd4c089d082a1dc905d7e349025b382b2c0a843&=&format=webp&width=460&height=613"
                        alt=""
                        name="Tô Quốc Thanh"
                        description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                    />
                </div>
            </div>
            <ConnectedLine />
            <Slide images={data} />
            <ConnectedLine />
            <ConnectedLine />
        </div>
    );
}

export default AboutUs;

import classNames from 'classnames/bind';
import styles from './GuestIntroductionItem.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function GuestIntroductionItem({ image, alt, title, paragraph, video }) {
    return (
        <div className={cx('wrapper')}>
            {video ? (
                <iframe
                    style={{ width: '50%', height: '480px' }}
                    src={`https://www.youtube.com/embed/${video}`}
                    title="video_demo"
                    allowFullScreen
                ></iframe>
            ) : (
                <Image className={cx('image')} src={image} alt={alt} />
            )}
            <div className={cx('content')}>
                <p className={cx('title')}>{title}</p>
                <p className={cx('paragraph')}>{paragraph}</p>
                <Button to={config.routes.guestshopbooks} types="findmore" className={cx('findMoreButton')}>
                    Find Out More
                </Button>
            </div>
        </div>
    );
}

export default GuestIntroductionItem;

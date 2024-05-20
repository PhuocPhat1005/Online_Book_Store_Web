import classNames from 'classnames/bind';
import styles from './IntroductionItem.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function introductionItem({ image, alt, title, paragraph }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('image')} src={image} alt={alt} />
            <div className={cx('content')}>
                <p className={cx('title')}>{title}</p>
                <p className={cx('paragraph')}>{paragraph}</p>
                <Button to={config.routes.shopbooks} types="findmore">
                    Find Out More
                </Button>
            </div>
        </div>
    );
}

export default introductionItem;

import classNames from 'classnames/bind';
import styles from './EventItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function EventItem({ data }) {
    return (
        <div className={cx('wrapper')} style={{ backgroundColor: `${data.color}` }}>
            <div className={cx('container')}>
                <span className={cx('icon')}>{data.icon}</span>
                <p className={cx('title')}>{data.title}</p>
                <p className={cx('description')}>{data.description}</p>

                <Button href={data.route} className={cx('more-btn')} types="findmore">
                    Find Out More
                </Button>
            </div>
        </div>
    );
}

export default EventItem;

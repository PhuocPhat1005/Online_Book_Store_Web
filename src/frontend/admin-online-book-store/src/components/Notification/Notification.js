import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);

function Notification({ showNotification }) {
    return (
        <div className={cx('wrapper', { active: showNotification })}>
            <div className={cx('header')}>
                <div className={cx('header_info')}>
                    <span className={cx('header_title')}>Notifications</span>
                    <span className={cx('header_notinum')}>10</span>
                </div>
                <div className={cx('header_options')}>
                    <span className={cx('header_option', { active: true })}>All</span>
                    <span className={cx('header_option')}>Unread</span>
                    <span className={cx('header_option')}>Mark all as read</span>
                </div>
            </div>
            <div className={cx('body')}>
                <NotificationItem active={true} />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
            </div>
        </div>
    );
}

export default Notification;

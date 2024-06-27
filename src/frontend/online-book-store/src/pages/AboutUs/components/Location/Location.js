import classNames from 'classnames/bind';
import styles from './Location.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Location() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <p className={cx('title')}>location</p>
                <div className={cx('address')}>
                    <FontAwesomeIcon className={cx('address_icon')} icon={faEarthAmerica} />
                    <p className={cx('subtext')}>
                        Find us at 227 Nguyen Van Cu St, Ward 4, District 5, Ho Chi Minh City
                    </p>
                </div>
            </div>
            <div className={cx('map')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2277.9498547312614!2d106.68103986827047!3d10.762754775267638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1719473682521!5m2!1svi!2s"
                    width="1000"
                    height="500"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="gg_map"
                ></iframe>
            </div>
        </div>
    );
}

export default Location;

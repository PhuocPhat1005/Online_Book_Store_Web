import classNames from 'classnames/bind';
import styles from './GuestMember.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function GuestMember({ src, alt, name, description }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={src} alt={alt} />
            <p className={cx('name')}>{name}</p>
            <p className={cx('description')}>{description}</p>
        </div>
    );
}

export default GuestMember;

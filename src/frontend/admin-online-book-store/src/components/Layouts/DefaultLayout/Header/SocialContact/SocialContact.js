import classNames from 'classnames/bind';
import styles from './SocialContact.scss';

const cx = classNames.bind(styles);

const SocialContact = ({ showSocialContact }) => {
    return (
        <div className={cx('social-contact-box', { active: showSocialContact })}>
            <div className={cx('header')}>
                <span className={cx('title')}>Social Contact</span>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('social-contact-menu')}>
                <a href="#"> <p className={cx('contact')}>Link 1</p> </a>
                <a href="#"> <p className={cx('contact')}>Link 2</p></a>
                <a href="#"> <p className={cx('contact')}>Link 3</p></a>
            </div>
        </div>
    );
};

export default SocialContact;

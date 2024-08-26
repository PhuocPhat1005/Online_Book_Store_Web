import classNames from 'classnames/bind';
import styles from './SubHeaderContentLayout.module.scss';

const cx = classNames.bind(styles);

function SubHeaderContentLayout({ title }) {
    return (
        <header className={cx('header')}>
            <p className={cx('title')}>{title}</p>
        </header>
    );
}

export default SubHeaderContentLayout;

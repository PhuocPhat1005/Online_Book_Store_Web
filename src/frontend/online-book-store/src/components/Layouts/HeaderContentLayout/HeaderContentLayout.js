import classNames from 'classnames/bind';
import styles from './HeaderContentlayout.module.scss';
import ConntectedLine from '~/components/ConnectedLine';

const cx = classNames.bind(styles);

function ContentLayout({ title, subtitle }) {
    return (
        <header className={cx('header')}>
            <p className={cx('title')}>{title}</p>
            <p className={cx('subtitle')}>{subtitle}</p>
            <ConntectedLine />
        </header>
    );
}

export default ContentLayout;

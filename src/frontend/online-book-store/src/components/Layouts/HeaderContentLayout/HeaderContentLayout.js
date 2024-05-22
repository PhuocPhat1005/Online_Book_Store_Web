import classNames from 'classnames/bind';
import styles from './HeaderContentlayout.module.scss';
import ConntectedLine from '~/components/ConnectedLine';

const cx = classNames.bind(styles);

function ContentLayout({ title, subtitle, placementSubtitle = 'bottom' }) {
    return (
        <header className={cx('header')}>
            {placementSubtitle === 'top' && (
                <p className={cx('subtitle', { top: placementSubtitle === 'top' })}>{subtitle}</p>
            )}
            <p className={cx('title')}>{title}</p>
            {placementSubtitle === 'bottom' && <p className={cx('subtitle')}>{subtitle}</p>}
            <ConntectedLine />
        </header>
    );
}

export default ContentLayout;

import classNames from 'classnames/bind';
import styles from './BasicSpinner.module.scss';

const cx = classNames.bind(styles);

function BasicSpinner({ color = '' }) {
    return (
        <div className={cx('content')} style={{ '--color-spinner': color === '' ? '#fff' : color }}>
            <div className={cx('spinner')}></div>
            <p className={cx('text')}>Waiting is happiness :)</p>
        </div>
    );
}

export default BasicSpinner;

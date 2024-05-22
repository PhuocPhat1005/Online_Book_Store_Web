import classNames from 'classnames/bind';
import styles from './BodyContent.module.scss';
import SelectSort from './components/SelectSort';

const cx = classNames.bind(styles);

function BodyContent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <p className={cx('sidebar-heading')}>Filter by</p>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-heading')}>
                        <SelectSort />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyContent;

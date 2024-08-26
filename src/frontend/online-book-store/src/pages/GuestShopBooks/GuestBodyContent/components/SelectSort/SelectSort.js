import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './SelectSort.module.scss';

const cx = classNames.bind(styles);

function SelectSort() {
    const renderMenuSort = (attrs) => (
        <div className={cx('menu-sort')} tabIndex="-1" {...attrs}>
            <ul className={cx('method-list')}>
                <li className={cx('method-item')}>
                    <span className={cx('method-item-text')}>Popular</span>
                </li>
                <li className={cx('method-item')}>
                    <span className={cx('method-item-text')}>Selling</span>
                </li>
                <li className={cx('method-item')}>
                    <span className={cx('method-item-text')}>Newest</span>
                </li>
                <li className={cx('method-item')}>
                    <span className={cx('method-item-text')}>Price (low to high)</span>
                </li>
                <li className={cx('method-item')}>
                    <span className={cx('method-item-text')}>Price (high to low)</span>
                </li>
            </ul>
        </div>
    );
    return (
        <div className={cx('wrapper')}>
            <Tippy interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
                <div className={cx('heading')}>
                    <p className={cx('title')}>Sort by</p>
                    <div className={cx('current_method')}>
                        <p className={cx('label')}>Popular</p>
                        <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default SelectSort;

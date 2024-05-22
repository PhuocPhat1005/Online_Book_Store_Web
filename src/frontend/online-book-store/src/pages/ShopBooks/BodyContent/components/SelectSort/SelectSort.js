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
                    <a className={cx('method-item-link')} href="/">
                        Sort by
                    </a>
                </li>
                <li className={cx('method-item')}>
                    <a className={cx('method-item-link')} href="/">
                        Newest
                    </a>
                </li>
                <li className={cx('method-item')}>
                    <a className={cx('method-item-link')} href="/">
                        Price (low to high)
                    </a>
                </li>
                <li className={cx('method-item')}>
                    <a className={cx('method-item-link')} href="/">
                        Price (high to low)
                    </a>
                </li>
                <li className={cx('method-item')}>
                    <a className={cx('method-item-link')} href="/">
                        Name A-Z
                    </a>
                </li>
                <li className={cx('method-item')}>
                    <a className={cx('method-item-link')} href="/">
                        Name Z-A
                    </a>
                </li>
            </ul>
        </div>
    );
    return (
        <div className={cx('wrapper')}>
            <Tippy visible interactive placement="bottom-start" render={renderMenuSort}>
                <div className={cx('heading')}>
                    <p className={cx('title')}>Sort by</p>
                    <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                </div>
            </Tippy>
        </div>
    );
}

export default SelectSort;

import classNames from 'classnames/bind';

import styles from './FilterAllMenu.module.scss';
import FilterAllItem from '../FilterAllItem';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import PriceRange from '../PriceRange';

const cx = classNames.bind(styles);

function FilterAllMenu({ deal = [], category = [], publishers = [], handleFilterAllDisplay }) {
    return (
        <div className={cx('overlay')}>
            <div className={cx('menu')}>
                <div className={cx('header')}>
                    <p className={cx('header_title')}>Filter by</p>
                    <FontAwesomeIcon className={cx('close_icon')} icon={faXmark} onClick={handleFilterAllDisplay} />
                </div>
                <div className={cx('body')}>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Deal</p>
                        <div className={cx('menu_item_content')}>
                            {deal.map((item, index) => (
                                <FilterAllItem item={item} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Rating</p>
                        <div className={cx('menu_item_content')}>
                            <FilterAllItem
                                item={'From 4 stars'}
                                StarIconComponent={() => <FontAwesomeIcon icon={faStar} />}
                                stars={4}
                            />
                            <FilterAllItem
                                item={'5 stars'}
                                StarIconComponent={() => <FontAwesomeIcon icon={faStar} />}
                                stars={5}
                            />
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Price (VND)</p>
                        <div className={cx('menu_item_content')}>
                            <FilterAllItem item={'Under 100.000 VND'} />
                            <FilterAllItem item={'100.000 - 200.000 VND'} />
                            <FilterAllItem item={'200.000 - 300.000 VND'} />
                            <FilterAllItem item={'Over 300.000 VND'} />
                            <PriceRange />
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Category</p>
                        <div className={cx('menu_item_content')}>
                            {category.map((item, index) => (
                                <FilterAllItem item={item} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Publishers</p>
                        <div className={cx('menu_item_content')}>
                            {publishers.map((item, index) => (
                                <FilterAllItem item={item} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('apply_btn')}>Apply Filter</Button>
                </div>
            </div>
        </div>
    );
}

export default FilterAllMenu;

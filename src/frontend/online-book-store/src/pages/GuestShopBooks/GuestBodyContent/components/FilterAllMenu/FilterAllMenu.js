import classNames from 'classnames/bind';

import styles from './FilterAllMenu.module.scss';
import FilterAllItem from '../FilterAllItem/FilterAllItem';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';
// import PriceRange from '../PriceRange';

const cx = classNames.bind(styles);
const PRICES = [
    {
        title: 'Under 100.000 VND',
        value: '<100000',
    },
    {
        title: '100.000 - 200.000 VND',
        value: '100000-200000',
    },
    {
        title: '200.000 - 300.000 VND',
        value: '200000-300000',
    },
    {
        title: '300.000 - 500.000 VND',
        value: '300000-500000',
    },
    {
        title: 'Over 500.000 VND',
        value: '>500000',
    },
];

function FilterAllMenu({
    deal = [],
    category = [],
    publishers = [],
    onCheckedItemsChange,
    handleFilterAllDisplay,
    handleApplyFilterAll,
}) {
    const handleCheckItem = (category, item) => {
        onCheckedItemsChange((prevCheckedItems) => {
            const updatedCategoryItems = prevCheckedItems[category].includes(item)
                ? prevCheckedItems[category].filter((i) => i !== item)
                : [...prevCheckedItems[category], item];

            return {
                ...prevCheckedItems,
                [category]: updatedCategoryItems,
            };
        });
    };

    // const handlePriceRangeChange = (type, value) => {
    //     onCheckedItemsChange((prevCheckedItems) => ({
    //         ...prevCheckedItems,
    //         price: {
    //             ...prevCheckedItems.price,
    //             [type]: value,
    //         },
    //     }));
    // };

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
                                <FilterAllItem onChange={() => handleCheckItem('deal', item)} item={item} key={index} />
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
                                onChange={() => handleCheckItem('rating', 4)}
                            />
                            <FilterAllItem
                                item={'5 stars'}
                                StarIconComponent={() => <FontAwesomeIcon icon={faStar} />}
                                stars={5}
                                onChange={() => handleCheckItem('rating', 5)}
                            />
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Price (VND)</p>
                        <div className={cx('menu_item_content')}>
                            {PRICES.map((item, index) => (
                                <FilterAllItem
                                    key={index}
                                    onChange={() => handleCheckItem('price', item.value)}
                                    item={item.title}
                                />
                            ))}
                            {/* <PriceRange onPriceRangeChange={handlePriceRangeChange} /> */}
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Category</p>
                        <div className={cx('menu_item_content')}>
                            {category.map((item, index) => (
                                <FilterAllItem
                                    onChange={() => handleCheckItem('category', item)}
                                    item={item}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('menu_item_block')}>
                        <p className={cx('label')}>Publishers</p>
                        <div className={cx('menu_item_content')}>
                            {publishers.map((item, index) => (
                                <FilterAllItem
                                    onChange={() => handleCheckItem('publishers', item)}
                                    item={item}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('apply_btn')} onClick={handleApplyFilterAll}>
                        Apply Filter
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FilterAllMenu;

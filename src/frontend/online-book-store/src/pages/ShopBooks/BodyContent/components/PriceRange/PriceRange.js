import classNames from 'classnames/bind';
import styles from './Pricerange.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function PriceRange() {
    const [minPrice, setMinPrice] = useState('100.000');
    const [maxPrice, setMaxPrice] = useState('500.000');

    const handleMinInput = (e) => {
        let value = e.target.value;

        value = value.replace(/\./g, ''); // Remove existing dots
        if (!isNaN(value) && value !== '') {
            value = addDotsToNumber(value);
            setMinPrice(value);
        }
    };

    const handleMaxInput = (e) => {
        let value = e.target.value;

        value = value.replace(/\./g, ''); // Remove existing dots
        if (!isNaN(value) && value !== '') {
            value = addDotsToNumber(value);
            setMaxPrice(value);
        }
    };

    return (
        <div className={cx('range')}>
            <p className={cx('range_label')}>Range:</p>
            <p className={cx('range_text')}>from</p>
            <input className={cx('range_input_min')} type="text" value={minPrice} onChange={handleMinInput} />
            <p className={cx('range_text')}>to</p>
            <input className={cx('range_input_max')} type="text" value={maxPrice} onChange={handleMaxInput} />
            <Button className={cx('btn')} types="text">
                find
            </Button>
        </div>
    );
}

export default PriceRange;

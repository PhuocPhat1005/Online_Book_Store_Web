import classNames from 'classnames/bind';
import styles from './Pricerange.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function PriceRange({ onPriceRangeChange }) {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('0');
    const [isApplied, setIsApplied] = useState(false);

    const handleApplied = () => {
        setIsApplied(true);
    };

    const handleInput = (value, setValue, type) => {
        value = value.replace(/^0+/, ''); // Remove leading zeros
        value = value.replace(/\./g, ''); // Remove existing dots
        let numberic_value = value;

        if (!isNaN(value) && value !== '') {
            value = addDotsToNumber(value);
            setValue(value);
            if (isApplied) {
                onPriceRangeChange(type, numberic_value);
                handleApplied();
            }
        } else if (value === '') {
            setValue('0');
            if (isApplied) {
                onPriceRangeChange(type, '0');
                handleApplied();
            }
        }
    };

    const handleMinInput = (e) => handleInput(e.target.value, setMinPrice, 'min');
    const handleMaxInput = (e) => handleInput(e.target.value, setMaxPrice, 'max');

    return (
        <div className={cx('range')}>
            <p className={cx('range_label')}>Range:</p>
            <p className={cx('range_text')}>from</p>
            <input className={cx('range_input_min')} type="text" value={minPrice} onChange={handleMinInput} />
            <p className={cx('range_text')}>to</p>
            <input className={cx('range_input_max')} type="text" value={maxPrice} onChange={handleMaxInput} />
            <Button className={cx('btn')} types="text" onClick={handleApplied}>
                apply
            </Button>
        </div>
    );
}

export default PriceRange;

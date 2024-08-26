import classNames from 'classnames/bind';
import styles from './SelectFieldItem.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

// props.data is an array of strings
function SelectFieldItem(props) {
    const [dataset, setDataSet] = useState([]);

    useEffect(() => {
        if (props.type === 'city') {
            const newDataset = props.data.map((item) => item.city);
            setDataSet(newDataset);
        } else if (props.type === 'province' && props.cityData) {
            const newDataset = props.data.find((item) => {
                return item.city === props.cityData;
            });
            setDataSet(newDataset.provinces);
        } else {
            setDataSet(props.data);
        }
    }, [props.type, props.cityData, props.data]);

    const [inputValue, setInputValue] = useState('');
    const [selectResult, setSelectResult] = useState(props.selectLabel);
    const [showOptions, setShowOptions] = useState(false);

    const removeDiacritics = (str) => {
        // Normalize the string to decompose combined characters into base characters and diacritical marks
        // Then remove all diacritical marks using a regular expression
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectResult = (item) => {
        setInputValue(item);
        setSelectResult(item);
        setShowOptions(false);

        if (props.type === 'city') {
            props.handleCityData(item);
        }
    };

    const filterItem = (item, index) => {
        // Normalize and remove diacritics from the item and input value
        const normalItemValue = removeDiacritics(item.toLowerCase());
        const normalInputValue = removeDiacritics(inputValue.toLowerCase());

        if (!normalItemValue.includes(normalInputValue)) {
            return;
        }

        return (
            <li className={cx('item')} key={index} onClick={() => handleSelectResult(item)}>
                {item}
            </li>
        );
    };

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className={cx('wrapper', props.className)}>
            <p className={cx('label')}>{props.label}</p>
            <div className={cx('input_field')}>
                <div className={cx('select_btn')} onClick={handleShowOptions}>
                    <span className={cx('select_result')}>{selectResult}</span>
                    <FontAwesomeIcon className={cx('dropdown_icon')} icon={faChevronDown} />
                </div>

                {(props.type !== 'province' || props.cityData) && (
                    <div className={cx('content', { hide: !showOptions })}>
                        <div className={cx('content_search')}>
                            <FontAwesomeIcon className={cx('search_icon')} icon={faMagnifyingGlass} />
                            <input
                                className={cx('search_bar')}
                                type="search"
                                name={props._name}
                                placeholder="Search..."
                                value={inputValue}
                                onChange={handleInput}
                            />
                        </div>
                        <ul className={cx('item_list')}>{dataset.map(filterItem)}</ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectFieldItem;

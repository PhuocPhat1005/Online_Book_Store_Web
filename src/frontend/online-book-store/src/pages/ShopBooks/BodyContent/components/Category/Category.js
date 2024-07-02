import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Category.module.scss';
import CategoryItem from '../CategoryItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Category({ data = [] }) {
    const [expandedItems, setExpandedItems] = useState({});

    const handleClick = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const renderItems = (items, parentIndex = '') => {
        return items.map((item, index) => {
            const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;
            const isExpanded = !!expandedItems[currentIndex];
            const isParent = !!item.children;

            return (
                <div key={currentIndex}>
                    <CategoryItem
                        item={item}
                        onClick={() => handleClick(currentIndex)}
                        isParent={isParent}
                        icon={<FontAwesomeIcon icon={faChevronDown} />}
                    />
                    {isParent && isExpanded && (
                        <div className={cx('sublist')}>{renderItems(item.children, currentIndex)}</div>
                    )}
                </div>
            );
        });
    };

    return <div className={cx('wrapper')}>{renderItems(data)}</div>;
}

export default Category;

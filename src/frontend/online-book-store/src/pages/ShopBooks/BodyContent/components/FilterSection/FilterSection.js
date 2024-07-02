import classNames from 'classnames/bind';
import styles from './FilterSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FilterMenu from '../FilterMenu';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FilterSection({ data }) {
    const [isShow, setIsShow] = useState(false);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('header')}>{data.title}</p>
            <div className={cx('body')}>
                {data.items.map((item, index) => (
                    <div className={cx('content')} key={index}>
                        <p className={cx('text')}>{item}</p>
                    </div>
                ))}
            </div>
            <div className={cx('dropdown_menu')} onClick={handleShow}>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {isShow && <FilterMenu data={data.items} />}
        </div>
    );
}

export default FilterSection;

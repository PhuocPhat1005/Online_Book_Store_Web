import classNames from 'classnames/bind';
import styles from './FilterAllItem.module.scss';

const cx = classNames.bind(styles);

function FilterAllItem({ item, StarIconComponent, stars, checked, onChange }) {
    return (
        <div className={cx('item')}>
            <div className={cx('checkbox_container')}>
                <input
                    className={cx('input_check')}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange(item)}
                />
                <span className={cx('checkmark')}></span>
            </div>
            {StarIconComponent && (
                <div className={cx('icon')}>
                    <span className={cx('icon_item')}>
                        <StarIconComponent />
                    </span>
                    <span className={cx('icon_item')}>
                        <StarIconComponent />
                    </span>
                    <span className={cx('icon_item')}>
                        <StarIconComponent />
                    </span>
                    <span className={cx('icon_item')}>
                        <StarIconComponent />
                    </span>
                    <span className={cx('icon_item', { four_stars: stars === 4 })}>
                        <StarIconComponent />
                    </span>
                </div>
            )}
            <p className={cx('label')}>{item}</p>
        </div>
    );
}

export default FilterAllItem;

import classNames from 'classnames/bind';
import styles from './GuestCategoryItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function GuestCategoryItem({ item, onClick, isParent, icon }) {
    return (
        <Button
            className={cx('menu_item', { parent: isParent })}
            types="text"
            rightIcon={isParent && icon}
            onClick={onClick}
        >
            {item.label}
        </Button>
    );
}

export default GuestCategoryItem;

import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to}>
            <span className={cx('title')}>{data.title}</span>
        </Button>
    );
}

export default MenuItem;

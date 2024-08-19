import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import Button from '~/components/Button';

import Cookies from 'universal-cookie';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const handleSignOut = () => {
        if (data.title === 'Sign out') {
            const cookies = new Cookies(null, { path: '/' });
            cookies.remove('jwt_authorization');
        }
    };

    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={handleSignOut}>
            <span className={cx('title')}>{data.title}</span>
        </Button>
    );
}

export default MenuItem;

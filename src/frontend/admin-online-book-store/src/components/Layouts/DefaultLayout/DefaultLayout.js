import classNames from 'classnames/bind';

import Header from './Header';
import SideBar from '../SideBar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <SideBar />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;

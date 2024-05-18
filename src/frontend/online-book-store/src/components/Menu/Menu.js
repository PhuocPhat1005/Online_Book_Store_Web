import Tippy from '@tippyjs/react/headless';
import MenuItem from '../MenuItem';
import { Wrapper as PopperWrapper } from '../Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ items, children }) {
    const renderResult = () => {
        return items.map((item, index) => <MenuItem data={item} key={index} />);
    };

    return (
        <div>
            <Tippy
                visible
                interactive
                render={(attrs) => (
                    <PopperWrapper>
                        <div className={cx('content')} tabIndex="-1" {...attrs}>
                            {renderResult()}
                        </div>
                    </PopperWrapper>
                )}
                placement="bottom"
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;

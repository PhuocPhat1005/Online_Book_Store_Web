import classNames from 'classnames/bind';
import styles from './FilterMenu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function FilterMenu({ data = [] }) {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('body')}>
                    {data.map((item, index) => (
                        <div className={cx('item')} key={index}>
                            <p className={cx('text')}>{item}</p>
                        </div>
                    ))}
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('button_delete')} types="text">
                        Delete Filter
                    </Button>
                    <Button className={cx('button_find')} types="text">
                        Find
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FilterMenu;

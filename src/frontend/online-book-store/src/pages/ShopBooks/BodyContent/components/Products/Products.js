import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('wrapper')}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </div>
    );
}

export default Products;

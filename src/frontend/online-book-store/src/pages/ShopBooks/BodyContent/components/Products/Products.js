import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);

function Products({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => (
                <ProductItem key={index} data={item} />
            ))}
            {/* <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem /> */}
        </div>
    );
}

export default Products;

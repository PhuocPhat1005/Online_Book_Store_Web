import classNames from 'classnames/bind';
import styles from './GuestProducts.module.scss';
import ProductItem from '../GuestProductItem';

const cx = classNames.bind(styles);

function Products({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => {
                return <ProductItem key={index} data={item} />;
            })}
        </div>
    );
}

export default Products;

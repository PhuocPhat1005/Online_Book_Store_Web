import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';
import request from '~/utils/request';
import Cookies from 'universal-cookie';
import BasicSpinner from '~/components/BasicSpinner';

const cx = classNames.bind(styles);
const ORDER_STATUS = ['All', 'Unprocessed', 'Confirmed', 'Delivering', 'Received', 'Cancelled/ Returned'];

function Order() {
    /**
     * Steps:
     * Query an API to get all orders (including order statuses) and store them in an array.
     * Iterating through each orders and checking if the status of that order is equal to current status.
     * The status in <OrderItem /> will be passed without status 'All' so that we can check when we should cancel order (unprocessed) or send feedbacks (received),...
     */
    const [orderList, setOrderList] = useState([]);
    const [books, setBooks] = useState([]);
    const [prices, setPrices] = useState([]);
    const [isActiveTab, setIsActiveTab] = useState(0); // index of tab.

    const [isLoading, setIsLoading] = useState(false);

    const handleActiveOrderStatus = (index) => {
        setIsActiveTab(index);
    };

    useEffect(() => {
        const fetchAllOrders = async () => {
            const cookies = new Cookies();
            const access_token = cookies.get('jwt_authorization');

            try {
                setIsLoading(true);

                const response = await request.get(`order/show_order?access_token=${access_token}`);

                if (response.status === 200) {
                    if (isActiveTab >= 1) {
                        const currentStatus = ORDER_STATUS[isActiveTab];
                        const responseOrders = response.data.filter((item) => item.status === currentStatus);

                        responseOrders ? setOrderList(responseOrders) : setOrderList([]);
                        setPrices(response.data.map((item) => item.total_price));
                    } else {
                        // console.log(response.data);
                        setOrderList(response.data);

                        setPrices(response.data.map((item) => item.total_price));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllOrders();
    }, [isActiveTab]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await Promise.all(
                    orderList.map(async (order) => {
                        const response = await request.get(`order/show_order_detail?order_id=${order.id}`);
                        return response.status === 200 ? response.data : null;
                    }),
                );

                // Filter out any null responses due to unsuccessful fetches
                setBooks(booksData.filter((book) => book !== null));
            } catch (error) {
                console.log(error);
            }
        };

        if (orderList.length > 0) {
            fetchBooks();
            setIsLoading(false);
        } else if (orderList.length <= 0) {
            setBooks([]);
            setIsLoading(false);
        }
    }, [orderList]);

    // useEffect(() => {
    //     console.log(books);
    // }, [books]);

    // useEffect(() => {
    //     console.log(allStatusOrder);
    // }, [allStatusOrder]);

    useEffect(() => {
        console.log(prices);
    }, [prices]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>your order</p>
            <div className={cx('core')}>
                <ul className={cx('core_header')}>
                    {ORDER_STATUS.map((item, index) => (
                        <li
                            key={index}
                            className={cx('core_header_item', { active: index === isActiveTab })}
                            onClick={() => handleActiveOrderStatus(index)}
                        >
                            <span className={cx('core_header_item_text')}>{item}</span>
                        </li>
                    ))}
                </ul>
                <div className={cx('core_body')}>
                    {books.length !== 0 &&
                        books.map((item, index) => (
                            <OrderItem totalPrice={prices[index]} bookData={item} key={index} />
                        ))}
                    {isLoading && <BasicSpinner color="#808080" />}
                </div>
            </div>
        </div>
    );
}

export default Order;

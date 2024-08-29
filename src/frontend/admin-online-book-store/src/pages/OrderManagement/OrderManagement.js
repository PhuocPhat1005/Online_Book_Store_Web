import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './OrderManagement.scss';
import config from '../../config';
import request from '../../utils/request';
import assets from '../../assets';
import DefaultImage from "../../assets/Common/null_book_cover.jpg";
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const OrderManagement = () => {
  const location = useLocation();
  let data = location.state?.orderData;
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  const [orders, setOrders] = useState([]); // object array

  useEffect(() => {
    const getOrderInfor = async () => {
      try {
        const response = await request.put(`admin/approval_orders`, data.id, data.status, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        console.log(response.data);
        setOrders(response.data);
        } catch (error) {
        if (error.response) {
          console.error('Form submission failed', error.response.data);
        } else if (error.request) {
          console.error('No response received', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      }
    };
    getOrderInfor();
  });

  return (
    <>
      <div className={cx('order-management')}>
        <div className={cx('order-management-header')}>
          <Button to={config.routes.orderSettings} className={cx('back-btn')} onClick={() => handleNavigate(config.routes.orderSettings)}>
            <p><FontAwesomeIcon icon={faCircleLeft} /> Back</p>
          </Button>
          <p className={cx('order-id-show')}>Order ID: {data.id}</p>
        </div>
        <div className={cx('order-management-body')}>
          <div className="App">
            <table class="table1">
              <tr class="tr1">
                <th class="th1">Item</th>
                <th class="th1">Price</th>
                <th class="th1">Amount</th>
              </tr>
            </table>
          </div>
          <div className={cx('status-box')}>
            <p className={cx('status-line')}>Status: {data.status}</p>
            <Button className={cx('status-btn')} onClick={data.status="Unprocessed"}>
              <p><FontAwesomeIcon icon={faPenToSquare}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unprocessed</p>
            </Button>
            <Button className={cx('status-btn')} onClick={data.status="Confirmed"}>
              <p><FontAwesomeIcon icon={faPenToSquare}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Confirmed</p>
            </Button>
            <Button className={cx('status-btn')} onClick={data.status="Delivering"}>
              <p><FontAwesomeIcon icon={faPenToSquare}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delivering</p>
            </Button>
            <Button className={cx('status-btn')} onClick={data.status="Received"}>
              <p><FontAwesomeIcon icon={faPenToSquare}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Received</p>
            </Button>
            <Button className={cx('status-btn')} onClick={data.status="Cancelled/ Returned"}>
              <p><FontAwesomeIcon icon={faPenToSquare}/>&nbsp;&nbsp;&nbsp;&nbsp;Cancelled/Returned</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
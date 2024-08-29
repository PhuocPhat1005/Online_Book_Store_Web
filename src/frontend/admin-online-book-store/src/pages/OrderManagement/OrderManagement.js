import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './OrderManagement.scss';
import config from '../../config';
import request from '../../utils/request';
import axios from 'axios';
import assets from '../../assets';
import DefaultImage from "../../assets/Common/null_book_cover.jpg";
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const OrderManagement = () => {
  const location = useLocation();
  let data = location.state?.orderData;
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
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
              <tr>
                <th width="40px">Item</th>
                <th width="40px">Price</th>
                <th width="40px">Amount</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './OrderSettings.scss';
import request from '../../utils/request';
import config from '../../config';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function SelectStatus() {
  const renderMenuSort = (attrs) => (
      <div className={cx('menu-sort')} tabIndex="-1" {...attrs}>
          <ul className={cx('method-list')}>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Unprocessed</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Confirmed</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Delivering</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Received</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Cancelled/Returned</span>
              </li>
          </ul>
      </div>
  );
  return (
    <div className={cx('wrapper-select')}>
      <Tippy interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
        <div className={cx('heading')}>
            <div className={cx('current_method')}>
                <p className={cx('label')}>Confirmed</p>
            </div>
        </div>
      </Tippy>
    </div>
  );
}


function SelectSortBy() {
  const renderMenuSort = (attrs) => (
      <div className={cx('menu-sort')} tabIndex="-1" {...attrs}>
          <ul className={cx('method-list')}>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Username</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Email</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Creation date</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Order ID</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Total spending</span>
              </li>
          </ul>
      </div>
  );
  return (
    <div className={cx('wrapper-sort-by-select')}>
      <Tippy className={cx('position-select')} interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
        <div className={cx('heading')}>
            <div className={cx('current_method')}>
                <p className={cx('label')}>by Username</p>
            </div>
        </div>
      </Tippy>
    </div>
  );
}

function OrderSettings( {data} ) {
  const [itemOrder, setDataItem] = useState(data);
  const navigate = useNavigate();
  const handleNavigate = (route, state) => {
    navigate(route, { state: { orderData: state } });
  };

  const [currentPage, setCurrentPage] = useState(0); // number
  const [showPages, setShowPages] = useState([1]); // number array
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]); // object array
  const [orderInfor, setOrderInfor] = useState(false);
  
  const handleCurrentPage = (page) => {
    setCurrentPage(page - 1);
  };
  const handleFirstPage = () => {
      if (currentPage < 0) return;
      else if (currentPage === 0 && showPages[0] > 1) {
          setShowPages(showPages.map((page) => 0));
          return;
      }
      setCurrentPage((prev) => 0);
  };
  const handleBackPage = () => {
      if (currentPage < 0) return;
      else if (currentPage === 0 && showPages[0] > 1) {
          setShowPages(showPages.map((page) => page - 1));
          return;
      }
      setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
      if (currentPage > 99) return;
      else if (currentPage === showPages.length - 1) {
          setShowPages(showPages.map((page) => page + 1));
          return;
      }
      setCurrentPage((prev) => prev + 1);
  };
  const handleLastPage = () => {
      if (currentPage > 99) return;
      else if (currentPage === showPages.length - 1) {
          setShowPages(showPages.map((page) => showPages.length - 1));
          return;
      }
      setCurrentPage((prev) => showPages.length - 1);
  };
  
  useEffect(() => {
    // Ensure current page index is valid
    if (currentPage < 0) {
        setCurrentPage(0);
    } else if (currentPage >= showPages.length) {
        setCurrentPage(showPages.length - 1);
    }
  }, [currentPage, showPages]);

  // API for getting orders
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setIsLoading(true);
        const response = await request.get(`admin/show_all_orders`);
        console.log(response.data);
        setOrders(response.data);
        setIsLoading(false);
      } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Form submission failed', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
    };
    getAllOrders();
  }, [currentPage]);

  // useEffect(() => {
  //   if (orderInfor) {
  //       setIsLoading(false);
  //       setOrderInfor(false);
  //       navigate(config.routes.guestdetailsbook, { state: { orderData: itemOrder } });
  //   }
  // }, [itemOrder, navigate, orderInfor]);
  return (
    <>
      <div className={cx('order-settings')}>
        <div className={cx('order-settings-filter')}>
          <Button className={cx('page-btn')} onClick={handleFirstPage}>
            <p>|&lt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={handleBackPage}>
            <p>&lt;&lt;</p>
          </Button>
          <p className={cx('page-box')}>Page: {currentPage+1}/{showPages.length}</p>
          {/* <input className={cx('page-box')} type="text" id="name" placeholder="Page: "/> */}
          <Button className={cx('page-btn')} onClick={handleNextPage}>
            <p>&gt;&gt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={handleLastPage}>
            <p>&gt;|</p>
          </Button>
          <p className={cx('option-title')}>Status</p>
          <div className={cx('option-filter')}>
            <SelectStatus />
          </div>
          {/* <p className={cx('sort-by-title')}>Sort by</p>
          <div className={cx('sort-by-filter')}>
            <SelectSortBy />
          </div> */}
        </div>
        <div className="App">
          <table border={1}>
            <tr>
              <th>All</th>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>See detail</th>
            </tr>
            {orders.map((itemOrder, index) => (
              <tr key={showPages.id}>
                <td></td>
                <td>{itemOrder.id}</td>
                <td>{itemOrder.user_id}</td>
                <td>{itemOrder.total_price} VND</td>
                <td>{itemOrder.status}</td>
                {/* <td><Link to={`/order-management/${itemOrder.user_id}-${itemOrder.id}`}>See detail</Link></td> */}
                <td>
                  <Button className={cx('see-detail-btn')}
                    // to={config.routes.orderManagement}
                    onClick={() => handleNavigate(config.routes.orderManagement, itemOrder )}>
                    See detail
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderSettings;
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './UserManagement.scss';
import request from '../../utils/request';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import React from 'react';

const cx = classNames.bind(styles);


function SelectOption() {
  const renderMenuSort = (attrs) => (
      <div className={cx('menu-sort')} tabIndex="-1" {...attrs}>
          <ul className={cx('method-list')}>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Ban</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>UnBan</span>
              </li>
          </ul>
      </div>
  );
  return (
    <div className={cx('wrapper-select')}>
      <Tippy className={cx('position-select')} interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
        <div className={cx('heading')}>
            <div className={cx('current_method')}>
                <p className={cx('label')}>Ban</p>
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
                  <span className={cx('method-item-text')}>by Name</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Email</span>
              </li>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>by Update at</span>
              </li>
          </ul>
      </div>
  );
  return (
    <div className={cx('wrapper-sort-by-select')}>
      <Tippy interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
        <div className={cx('heading')}>
            <div className={cx('current_method')}>
                <p className={cx('label')}>by Name</p>
            </div>
        </div>
      </Tippy>
    </div>
  );
}

function UserManagement() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0); // number
  const [showPages, setShowPages] = useState([1]); // number array
  const [showOptions, setShowOptions] = useState(false);
  const [users, setUsers] = useState([]); // object array
  const handleOptions = () => {
      setShowOptions(!showOptions);
  };

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
    const getAllUsers = async () => {
      try {
        const response = await request.get(`admin/show_list_users`);
        console.log(response.data);
        setUsers(response.data);
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
    getAllUsers();
  }, [currentPage]);

  return (
    <>
      <div className={cx('user-management')}>
        <div className={cx('user-management-filter')}>
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
          <p className={cx('option-title')}>Options</p>
          <div className={cx('option-filter')}>
            <SelectOption />
          </div>
          <p className={cx('sort-by-title')}>Sort by</p>
          <div className={cx('sort-by-filter')}>
            <SelectSortBy />
          </div>
        </div>
        <div className="App">
          <table border={1}>
            <tr>
              {/* <th>All</th> */}
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              {/* <th>Create at</th> */}
              <th>Update at</th>
              {/* <th>Ban</th> */}
              <th>See detail</th>
            </tr>
            {users.map((itemUser, index) => (
              <tr key={showPages.id}>
                <td>{itemUser.id}</td>
                <td>{itemUser.full_name}</td>
                <td>{itemUser.email}</td>
                <td>{itemUser.phone}</td>
                <td>{itemUser.address}</td>
                {/* <td>{itemUser.created_at}</td> */}
                <td>{itemUser.updated_at}</td>
                {/* <td>{itemUser.banned_to}</td> */}
                <td>
                  <Button className={cx('see-detail-btn')}
                    // to={config.routes.orderManagement}
                    // onClick={() => handleNavigate(config.routes.orderManagement, itemUser )}
                    >
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

export default UserManagement;

import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './UserManagement.scss';
import { useState } from 'react';
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
      <Tippy interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
        <div className={cx('heading')}>
            <div className={cx('current_method')}>
                <p className={cx('label')}>by Username</p>
            </div>
        </div>
      </Tippy>
    </div>
  );
}

function UserManagement() {
  const [showOptions, setShowOptions] = useState(false);
  const handleOptions = () => {
      setShowOptions(!showOptions);
  };

  let page = 1;
  let max_page = 100;
  let option_choice = "Choose an option";
  return (
    <>
      <div className={cx('user-management')}>
        <div className={cx('user-management-filter')}>
          <Button className={cx('page-btn')} onClick={() => {}}>
            <p>|&lt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={() => {page-=1}}>
            <p>&lt;&lt;</p>
          </Button>
          <p className={cx('page-box')}>Page: {page}/{max_page}</p>
          {/* <input className={cx('page-box')} type="text" id="name" placeholder="Page: "/> */}
          <Button className={cx('page-btn')} onClick={() => {}}>
            <p>&gt;&gt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={() => {}}>
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
              <th>All</th>
              <th>Username</th>
              <th>Name</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Create at</th>
              <th>Update at</th>
              <th>Status</th>
            </tr>
            {/* {showPages.map((item, index) => (
              <tr key={showPages.id}>
                <td>{showPages.isbn}</td>
                <td>{showPages.book_name}</td>
                <td>{showPages.created_at}</td>
                <td>{showPages.updated_at}</td>
                <td>{showPages.price}</td>
              </tr>
            ))} */}
          </table>
        </div>
      </div>
    </>
  );
}

export default UserManagement;

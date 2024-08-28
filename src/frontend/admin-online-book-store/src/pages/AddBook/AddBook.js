import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './AddBook.scss';
import config from '../../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const cx = classNames.bind(styles);


const AddBook = ({ admin }) => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
      if (admin) {
          navigate(route);
      }
  };
    return (
      <>
        <div className={cx('add-book')}>
          <div className={cx('add-book-header')}>
            <Button to={config.routes.bookSettings} className={cx('back-btn')} onClick={() => handleNavigate(config.routes.bookSettings)}>
              <p><FontAwesomeIcon icon={faCircleLeft} /> Back</p>
            </Button>
            {/* <p className={cx('isbn-show')}>ISBN: {}</p> */}
          </div>
          <div className={cx('add-book-info')}>
            <div className={cx('add-book-info-text')}>
            <form>
              <label for="isbn" className={cx('box-name')}>ISBN</label>
              <input type="text" id="isbn" name="isbn" placeholder="E.g. 978-0-545-01022-1"></input>
              <label for="bookname" className={cx('box-name')}>Book's Name</label>
              <input type="text" id="bookname" name="bookname" placeholder="E.g. THÓI QUEN THÀNH CÔNG"></input>
              <label for="authorname" className={cx('box-name')}>Author's Name</label>
              <input type="text" id="authorname" name="authorname" placeholder="E.g. NAPOLEON HILL"></input>
              <label for="category" className={cx('box-name')}>Category</label>
              <input type="text" id="category" name="category" placeholder="E.g. Inspire"></input>
              <label for="publisher" className={cx('box-name')}>Publisher</label>
              <input type="text" id="publisher" name="publisher" placeholder="E.g. Nhà xuất bản trẻ"></input>
              <label for="publishingdate" className={cx('box-name')}>Publishing date</label>
              <input type="text" id="publishingdate" name="publishingdate" placeholder="E.g. 01/02/2018"></input>
              <label for="price" className={cx('box-name')}>Price</label>
              <input type="text" id="price" name="price" placeholder="E.g. 250,000 VND"></input>
              <label for="language" className={cx('box-name')}>Language</label>
              <input type="text" id="language" name="language" placeholder="E.g. Vietnamese"></input>
              <label for="translator" className={cx('box-name')}>Translator</label>
              <input type="text" id="translator" name="translator" placeholder="E.g. Nhiều dịch giả (First News)"></input>
              <label for="bookcover" className={cx('box-name')}>Book's cover</label>
              <input type="text" id="bookcover" name="bookcover" placeholder="E.g. Soft cover"></input>
              <label for="description" className={cx('box-name')}>Description</label>
              <textarea type="text2" id="description" name="description" 
              // class="description-box"
              placeholder=
              "E.g. Cuốn sách chia sẻ những thói quen và nguyên tắc để đạt được thành công trong sự nghiệp và cuộc sống, dựa trên nghiên cứu và phỏng vấn các doanh nhân thành công.">
              </textarea>
            </form>
              <Button to={config.routes.bookSettings} className={cx('add-book-submit-btn')} onClick={() => handleNavigate(config.routes.bookSettings)}>
                <p>Add book</p>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default AddBook;

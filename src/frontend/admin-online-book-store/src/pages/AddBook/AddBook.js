import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './AddBook.scss';
import config from '../../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

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
            <p className={cx('isbn-show')}>
              ISBN: {}
            </p>
          </div>
          <div className={cx('add-book-info-text')}>
            <p className={cx('box-name')}>
              ISBN
            </p>
            <p className={cx('box-name')}>
              Book's name
            </p>
            <p className={cx('box-name')}>
              Author's name
            </p>
            <p className={cx('box-name')}>
              Category
            </p>
            <p className={cx('box-name')}>
              Publisher
            </p>
            <p className={cx('box-name')}>
              Publishing date
            </p>
            <p className={cx('box-name')}>
              Price
            </p>
            <p className={cx('box-name')}>
              Language
            </p>
            <p className={cx('box-name')}>
              Translator
            </p>
            <p className={cx('box-name')}>
              Book’s cover type
            </p>
            <p className={cx('box-name')}>
              Description
            </p>
          </div>
        </div>
      </>
    );
  }
  
  export default AddBook;
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './Events.scss';
import config from '../../config';
import request from '../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const cx = classNames.bind(styles);

function Events() {
  return (
      <>
        <div className={cx('events')}>
        </div>
      </>
  );
}

export default Events;

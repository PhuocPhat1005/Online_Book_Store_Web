import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './BookSettings.scss';
import Slide from '../../components/Slide';
import config from '../../config';
import request from '../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Dashboards() {
  return (
    <>
      <div className={cx('book-settings')}>
      </div>
    </>
  );
}

export default Dashboards;
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './BookSettings.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BookSettings() {
  let page = 1;
  let max_page = 100;
  return (
    <>
      <div className={cx('book-settings')}>
        <div className={cx('book-settings-filter')}>
          <Button className={cx('page-btn')} onClick={() => {}}>
            <p>|&lt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={() => {page-=1}}>
            <p>&lt;&lt;</p>
          </Button>
          <div className={cx('page-box')}>Page: {page}/{max_page}</div>
          {/* <input className={cx('page-box')} type="text" id="name" placeholder="Page: "/> */}
          <Button className={cx('page-btn')} onClick={() => {}}>
            <p>&lt;&lt;</p>
          </Button>
          <Button className={cx('page-btn')} onClick={() => {}}>
            <p>&gt;|</p>
          </Button>
          <Button className={cx('add-book-btn')} onClick={() => {}}>
            <p><FontAwesomeIcon icon={faPlusCircle} /> Add book</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default BookSettings;
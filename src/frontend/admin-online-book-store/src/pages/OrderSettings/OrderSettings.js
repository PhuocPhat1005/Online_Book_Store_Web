import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './OrderSettings.scss';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function SelectOption() {
  const renderMenuSort = (attrs) => (
      <div className={cx('menu-sort')} tabIndex="-1" {...attrs}>
          <ul className={cx('method-list')}>
              <li className={cx('method-item')}>
                  <span className={cx('method-item-text')}>Pending</span>
              </li>
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
                  <span className={cx('method-item-text')}>Done</span>
              </li>
          </ul>
      </div>
  );
  return (
    <div className={cx('wrapper-select')}>
      <p className={cx('title-select')}>Options</p>
      <Tippy interactive placement="bottom-start" offset={[35, 5]} render={renderMenuSort}>
          <div className={cx('heading')}>
              <div className={cx('current_method')}>
                  <p className={cx('label')}>Done</p>
              </div>
          </div>
      </Tippy>
    </div>
  );
}

function OrderSettings() {
  const [showOptions, setShowOptions] = useState(false);
  const handleOptions = () => {
      setShowOptions(!showOptions);
  };

  let page = 1;
  let max_page = 100;
  let option_choice = "Choose an option";
  return (
    <>
      <html>
        <div className={cx('order-settings')}>
          <div className={cx('order-settings-filter')}>
            <Button className={cx('page-btn')} onClick={() => {}}>
              <p>|&lt;</p>
            </Button>
            <Button className={cx('page-btn')} onClick={() => {page-=1}}>
              <p>&lt;&lt;</p>
            </Button>
            <p className={cx('page-box')}>Page: {page}/{max_page}</p>
            {/* <input className={cx('page-box')} type="text" id="name" placeholder="Page: "/> */}
            <Button className={cx('page-btn')} onClick={() => {}}>
              <p>&lt;&lt;</p>
            </Button>
            <Button className={cx('page-btn')} onClick={() => {}}>
              <p>&gt;|</p>
            </Button>
            <div className={cx('option-filter')}>
              <SelectOption />
            </div>
            {/* <div class="custom-select">
              {/* <select>
              </select>
                <option value="0">Select car:</option>
              <Options showOptions={showOptions} />
            </div> */}
            {/* <Options showOptions={showOptions} /> */}
            {/* <Button
                className={cx('custom-choice')}
                onClick={handleOptions}
            >
              <Options showOptions={showOptions} />
            </Button> */}
          </div>
        </div>
      </html>
    </>
  );
}

export default OrderSettings;
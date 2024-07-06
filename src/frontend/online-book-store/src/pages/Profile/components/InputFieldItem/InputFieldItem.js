import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import styles from './InputFieldItem.module.scss';

const cx = classNames.bind(styles);

function InputFieldItem(props, _ref) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{props.label}</p>
            <input
                ref={_ref}
                className={cx('input_item')}
                name={props._name}
                type="text"
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default forwardRef(InputFieldItem);

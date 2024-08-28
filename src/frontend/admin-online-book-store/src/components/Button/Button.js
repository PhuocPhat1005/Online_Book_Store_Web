import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React from 'react';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, className, types = '', size = '', disabled, leftIcon, rightIcon, children, ...props }) {
    let Component = 'button';
    const _props = {
        ...props,
    };

    if (to) {
        _props.to = to;
        Component = Link;
    } else if (href) {
        _props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        text: types.includes('text'),
        primary: types.includes('primary'),
        primary1: types.includes('primary1'),
        addtocart: types.includes('addtocart'),
        checkout: types.includes('checkout'),
        submit: types.includes('submit'),
        findmore: types.includes('findmore'),
        disabled,
    });

    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }

    return (
        <Component className={classes} {..._props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

export default Button;

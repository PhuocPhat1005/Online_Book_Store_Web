import { useState, forwardRef } from 'react';
import classNames from 'classnames';

import images from '../../assets';
import styles from './Image.module.scss';
import React from 'react';

function Image({ src, alt, className, fallback: customFallback = images.fallback, ...props }, ref) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);

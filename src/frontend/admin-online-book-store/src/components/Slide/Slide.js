import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import Image from '~/components/Image';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Slide({ images = [] }) {
    const timerId = useRef();
    const [currentIndexSlide, setCurrentIndexSlide] = useState(0);

    useEffect(() => {
        timerId.current = setTimeout(() => {
            setCurrentIndexSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearTimeout(timerId.current);
    }, [currentIndexSlide]);

    const prevButton = () => {
        setCurrentIndexSlide(currentIndexSlide - 1);
        if (currentIndexSlide <= 0) setCurrentIndexSlide(images.length - 1);
    };

    const nextButton = () => {
        setCurrentIndexSlide((currentIndexSlide + 1) % images.length);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {images.map((items, index) => (
                    <Image
                        className={cx('content', { active: index === currentIndexSlide })}
                        src={items}
                        alt=""
                        key={index}
                        style={{ transform: `translateX(-${currentIndexSlide * 100}%)` }}
                    />
                ))}
            </div>
            <button className={cx('control-prev')} onClick={prevButton}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className={cx('control-next')} onClick={nextButton}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

export default Slide;

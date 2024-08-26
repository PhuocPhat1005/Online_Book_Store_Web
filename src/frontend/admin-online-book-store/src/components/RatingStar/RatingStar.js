import classNames from 'classnames/bind';
import styles from './RatingStar.module.scss';

import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function RatingStar({ className, rating, width = 18, height = 18 }) {
    const totalRating = 5;
    let int = parseInt(rating[0]);
    let decimal = parseFloat(rating.substr(1));

    return (
        <div
            className={cx('stars_container', {
                [className]: className,
            })}
        >
            {Array.from({ length: totalRating }, (_, index) => {
                const rate = int / (index + 1);

                if (index + 1 >= int + 2) {
                    decimal = 0;
                }

                return (
                    <Image
                        className={cx('star_icon', {
                            filled: rate >= 1,
                            aquarter: rate < 1 && decimal > 0 && decimal <= 0.25,
                            ahalf: rate < 1 && decimal > 0.25 && decimal <= 0.5,
                            threequarters: rate < 1 && decimal > 0.5,
                        })}
                        src={assets.star_icon}
                        alt="star_icon"
                        key={index}
                        style={{ width: `${width}px`, height: `${height}px` }}
                    />
                );
            })}
        </div>
    );
}

export default RatingStar;

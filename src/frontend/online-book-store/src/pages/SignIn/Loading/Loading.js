import classNames from "classnames/bind";
import styles from './Loading.module.scss'

const cx = classNames.bind(styles);

function Loading({className}) {
    return (
        <div className={className}>
            <svg className={cx('circle_container')}>
                <circle cx="70" cy="70" r="70" className={cx('circle_load')}></circle>
            </svg>
        </div>
    )
}

export default Loading;
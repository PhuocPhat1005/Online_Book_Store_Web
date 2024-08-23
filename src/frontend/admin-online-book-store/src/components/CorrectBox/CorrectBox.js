import classNames from "classnames/bind";
import styles from './CorrectBox.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function CorrectBox({mess="", onClose}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('content')}>{mess}</p>
                <FontAwesomeIcon className={cx('icon')} icon={faXmark} onClick={onClose}/>
            </div>
        </div>
    )
}

export default CorrectBox;
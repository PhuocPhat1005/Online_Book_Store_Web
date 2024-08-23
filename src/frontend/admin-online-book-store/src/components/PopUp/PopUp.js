import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopUp.module.scss';

const PopUp = ({ onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2 className={styles.oops}>OOPS !</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className={styles.body}>
                    <p>This feature require having an account.</p>
                    <p>
                        Sign up <a href="/signup">here</a> to access this feature.
                    </p>
                    <p>
                        Already have an account? Sign in <a href="/signin">here</a>
                    </p>
                    <button className={styles.continueButton} onClick={onClose}>
                        Continue without an account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;

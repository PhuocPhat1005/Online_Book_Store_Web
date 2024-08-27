import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import SubHeaderContentLayout from '~/components/Layouts/SubHeaderContentLayout';
import ConnectedLine from '~/components/ConnectedLine';
import Button from '~/components/Button';
import FAQMenu from './conponents/FAQMenu';
import PopUpSentSuccesful from './conponents/PopUpSentSuccesful';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Contact() {
    const formDataRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        emailjs
            .sendForm('service_52cn0sv', 'template_kef8x5p', formDataRef.current, {
                publicKey: 'qaIatjJnkKdIWaJUM',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    event.target.reset();
                    setShowPopup(true);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderContentLayout title="Contact Us" subtitle="Got a question ?" placementSubtitle="top" />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('heading')}>
                        <p className={cx('label')}>How to find out more...</p>
                        <SubHeaderContentLayout title="SiBooks" />
                    </div>
                    <form ref={formDataRef} className={cx('form-container')} onSubmit={handleSubmit}>
                        <input className={cx('input-form')} type="text" name="username" placeholder="Name" required />
                        <input className={cx('input-form')} type="email" name="email" placeholder="Email" required />
                        <input className={cx('input-form')} type="text" name="subject" placeholder="Subject" required />
                        <textarea
                            className={cx('input-form')}
                            name="message"
                            placeholder="Type your message here..."
                            spellCheck={false}
                        />
                        <Button className={cx('submit-btn')} types="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
            <ConnectedLine />
            <div className={cx('faq-container')}>
                <div className={cx('faq-content')}>
                    <div className={cx('faq-header')}>
                        <p className={cx('faq-title')}>Frequently Asked Questions</p>
                        <p className={cx('faq-subtitle')}>(We understand, there's a lot to question.)</p>
                    </div>
                    <div className={cx('faq-body')}>
                        <FAQMenu />
                    </div>
                </div>
                <ConnectedLine />
                <ConnectedLine />
            </div>

            {/* Render the Popup component conditionally */}
            {showPopup && (
                <PopUpSentSuccesful message="Your message has been sent successfully." onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Contact;

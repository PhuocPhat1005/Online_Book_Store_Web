import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import SubHeaderContentLayout from '~/components/Layouts/SubHeaderContentLayout';
import ConnectedLine from '~/components/ConnectedLine';
import Button from '~/components/Button';
import FAQMenu from './conponents/FAQMenu';

const cx = classNames.bind(styles);

function Contact() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = new FormData(event.target);
        // const data = {
        //     username: formData.get('username'),
        //     email: formData.get('email'),
        //     password: formData.get('password')
        // };

        // console.log(data);

        // try {
        //     const response = await fetch('http://127.0.0.1:8000/auth/sign_up', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     if (response.ok) {
        //         // Handle successful form submission
        //         console.log('Form submitted successfully');
        //     } else {
        //         // Handle errors
        //         console.error('Form submission failed');
        //     }
        // } catch (error) {
        //     console.error('Form submission error:', error);
        // }
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
                    <form className={cx('form-container')} onSubmit={handleSubmit}>
                        <input className={cx('input-form')} type="text" name="username" placeholder="Name" required />
                        <input className={cx('input-form')} type="email" name="email" placeholder="Email" required />
                        <input className={cx('input-form')} type="text" name="subject" placeholder="Subject" required />
                        <textarea className={cx('input-form')} name="message" placeholder="Type your message here..." />
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
        </div>
    );
}

export default Contact;

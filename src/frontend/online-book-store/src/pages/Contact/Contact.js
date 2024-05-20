import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import SubHeaderContentLayout from '~/components/Layouts/SubHeaderContentLayout';
import ConnectedLine from '~/components/ConnectedLine';
import Button from '~/components/Button';
import FAQMenu from './conponents/FAQMenu';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <HeaderContentLayout title="Contact Us" subtitle="Got a question ?" />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('heading')}>
                        <p className={cx('label')}>How to find out more...</p>
                        <SubHeaderContentLayout title="SiBooks" />
                    </div>
                    <form className={cx('form-container')}>
                        <input className={cx('input-form')} type="text" name="name" placeholder="Name" required />
                        <input className={cx('input-form')} type="email" name="emai" placeholder="Email" required />
                        <input className={cx('input-form')} type="text" name="subject" placeholder="Subject" required />
                        <textarea className={cx('input-form')} name="name" placeholder="Type your message here..." />
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

import classNames from 'classnames/bind';
import styles from './GuestFAQMenu.module.scss';
import FAQItem from '../GuestFAQItem';

const cx = classNames.bind(styles);
const FAQs = [
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
];

function guestfaqMenu() {
    return (
        <div className={cx('wrapper')}>
            {FAQs.map((item, index) => (
                <FAQItem title={item.title} description={item.description} key={index} />
            ))}
        </div>
    );
}

export default guestfaqMenu;

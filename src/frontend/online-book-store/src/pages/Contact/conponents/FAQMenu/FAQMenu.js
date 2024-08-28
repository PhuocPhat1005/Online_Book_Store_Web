import classNames from 'classnames/bind';
import styles from './FAQMenu.module.scss';
import FAQItem from '../FAQItem';

const cx = classNames.bind(styles);
const FAQs = [
    {
        title: 'Are you currently hiring or accepting resumes?',
        description:
            "No, we aren't currently hiring or accepting resumes. Staff turnover has always been very low; we love what we do.",
    },
    {
        title: 'Where can I find you?',
        description: 'You can find us at 227 Nguyen Van Cu St, Ward 4, District 5, Ho Chi Minh City.',
    },
    {
        title: 'Can I bought book without an account?',
        description:
            'Unfortunately you cannot do that. We need basic information to deliver to you and ensure a smooth experience, so creating an account is mandatory. We guarantee that your personal information will be kept confidential. ',
    },
    {
        title: 'Where can I get a discount?',
        description:
            'Currently there is no discount code for you. You can check out our sale event where books are on sale at extremely discounted prices. ',
    },
    {
        title: 'Is there any chance for your store to open more branches? ',
        description:
            'We currently have only 1 shop with the location is 227 Nguyen Van Cu St, Ward 4, District 5, Ho Chi Minh City. We might expand our branch in the future, but that is not something will happen anytime soon.',
    },
];

function faqMenu() {
    return (
        <div className={cx('wrapper')}>
            {FAQs.map((item, index) => (
                <FAQItem title={item.title} description={item.description} key={index} />
            ))}
        </div>
    );
}

export default faqMenu;

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';

import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './BodyContent.module.scss';
import Category from './components/Category';
import FilterSection from './components/FilterSection';
import FilterAllMenu from './components/FilterAllMenu';
import { useState } from 'react';
import SelectSort from './components/SelectSort';

const cx = classNames.bind(styles);

const GENRES = [
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Literature',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Short story',
                children: [
                    {
                        label: 'Short stories - Vietnamese',
                    },
                    {
                        label: 'Short stories - English',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Novella',
                children: [
                    {
                        label: 'Long stories - Vietnamese',
                    },
                    {
                        label: 'Long stories - English',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Novel',
                children: [
                    {
                        label: 'European novels',
                    },
                    {
                        label: 'Chinese novels',
                    },
                    {
                        label: 'Japanese novels',
                    },
                    {
                        label: 'American novels',
                    },
                    {
                        label: 'Other novels',
                    },
                    {
                        label: 'Romance',
                    },
                    {
                        label: 'Sci-fi',
                    },
                    {
                        label: 'Fantasy',
                    },
                    {
                        label: 'Detective',
                    },
                    {
                        label: 'Crime',
                    },
                    {
                        label: 'Dystopian',
                    },
                    {
                        label: 'Mythology ',
                    },
                    {
                        label: 'Epic',
                    },
                    {
                        label: 'Historical',
                    },
                    {
                        label: 'Horror',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Memoir',
                children: [
                    {
                        label: 'Vietnamese memoirs',
                    },
                    {
                        label: 'Foreign memoirs',
                    },
                ],
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Natural Science',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Mathematics',
                children: [
                    {
                        label: 'Arithmetic',
                    },
                    {
                        label: 'Algebra',
                    },
                    {
                        label: 'Plane geometry',
                    },
                    {
                        label: 'Solid geometry',
                    },
                    {
                        label: 'Topology',
                    },
                    {
                        label: 'Statistics & Probability',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Physics',
                children: [
                    {
                        label: 'Mechanics',
                    },
                    {
                        label: 'Thermodynamics',
                    },
                    {
                        label: 'Electricity',
                    },
                    {
                        label: 'Electromagnetism',
                    },
                    {
                        label: 'Optics',
                    },
                    {
                        label: 'Nuclear physics',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Chemistry',
                children: [
                    {
                        label: 'Inorganic chemistry',
                    },
                    {
                        label: 'Organic chemistry',
                    },
                    {
                        label: 'Physical chemistry',
                    },
                    {
                        label: 'Biochemistry',
                    },
                    {
                        label: 'Theoretical chemistry',
                    },
                    {
                        label: 'Analytical chemistry',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Biology',
                children: [
                    {
                        label: 'Molecular biology',
                    },
                    {
                        label: 'Genetics',
                    },
                    {
                        label: 'Microbiology',
                    },
                    {
                        label: 'Ecology',
                    },
                    {
                        label: 'Human biology',
                    },
                    {
                        label: 'Environmental biology',
                    },
                ],
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Social Science',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'History',
                children: [
                    {
                        label: 'Vietnamese history',
                    },
                    {
                        label: 'World history',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Geography',
                children: [
                    {
                        label: 'Vietnamese geography',
                    },
                    {
                        label: 'World geography',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Language',
                children: [
                    {
                        label: 'English',
                    },
                    {
                        label: 'Chinese',
                    },
                    {
                        label: 'German',
                    },
                    {
                        label: 'French',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Philosophy',
                children: [
                    {
                        label: 'Western philosophy',
                    },
                    {
                        label: 'Eastern philosophy',
                    },
                ],
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Programming & Technology',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Basic Language',
                children: [
                    {
                        label: 'Python',
                    },
                    {
                        label: 'Java',
                    },
                    {
                        label: 'C++',
                    },
                    {
                        label: 'Other programming languages',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Web Development',
                children: [
                    {
                        label: 'HTML/ CSS',
                    },
                    {
                        label: 'JavaScript',
                    },
                    {
                        label: 'Frameworks',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Data Science',
                children: [
                    {
                        label: 'Machine learning',
                    },
                    {
                        label: 'Data analysis',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Security',
                children: [
                    {
                        label: 'Computer networks',
                    },
                    {
                        label: 'Information security',
                    },
                ],
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Mental & Psychology',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Psychology',
                children: [
                    {
                        label: 'Developmental psychology',
                    },
                    {
                        label: 'Clinical psychology',
                    },
                    {
                        label: 'Social psychology',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Soft skills',
                children: [
                    {
                        label: 'Soft skills',
                    },
                    {
                        label: 'Self-help',
                    },
                    {
                        label: 'Inspiration',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Mentality',
                children: [
                    {
                        label: 'Meditation and mindfulness',
                    },
                    {
                        label: 'Stress management',
                    },
                ],
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        label: 'Textbook & Cirriculum',
        children: [
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Primary school',
                children: [
                    {
                        label: 'Grade 1',
                    },
                    {
                        label: 'Grade 2',
                    },
                    {
                        label: 'Grade 3',
                    },
                    {
                        label: 'Grade 4',
                    },
                    {
                        label: 'Grade 5',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Secondary school',
                children: [
                    {
                        label: 'Grade 6',
                    },
                    {
                        label: 'Grade 7',
                    },
                    {
                        label: 'Grade 8',
                    },
                    {
                        label: 'Grade 9',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'High school',
                children: [
                    {
                        label: 'Grade 10',
                    },
                    {
                        label: 'Grade 11',
                    },
                    {
                        label: 'Grade 12',
                    },
                ],
            },
            {
                icon: <FontAwesomeIcon icon={faChevronDown} />,
                label: 'Higher Education',
                children: [
                    {
                        label: 'University',
                    },
                    {
                        label: 'Further Education',
                    },
                ],
            },
        ],
    },
];

const CATEGORY = [
    'Literature',
    'Natural Science',
    'Social Science',
    'Programming & Technology',
    'Mental & Psychology',
    'Textbook & Cirriculum',
    'Comic & Manga',
];

const FILTER_SECTION_1 = {
    title: 'Daily Sale',
    items: [
        '10% off',
        '20% off',
        '30% off',
        '40% off',
        '50% off',
        '60% off',
        '70% off',
        '80% off',
        'Buy 1 get 1',
        'Other',
    ],
};

const FILTER_SECTION_2 = {
    title: 'Publishers',
    items: [
        'NXB Tổng Hợp TPHCM',
        'NXB Công Nghệ',
        'NXB Đại Học Quốc Gia',
        'NXB Văn Học',
        'NXB Đại Học Quốc Gia Hà Nội',
        'NXB Đại Học Quốc Gia TP.HCM',
        'NXB Giáo Dục',
        'NXB Giáo Dục Việt Nam',
        'NXB Khoa Học Tự Nhiên',
        'NXB Khoa Học Xã Hội',
        'NXB Khoa Học và Kỹ Thuật',
        'NXB Kim Đồng',
        'NXB Lao Động',
        'NXB Quân Đội Nhân Dân',
        'NXB Tổng Hợp TPHCM',
        'NXB Thế Giới',
        'NXB Thanh Niên',
        'NXB Tri Thức',
        'NXB Y Học',
        'NXB Văn Hóa',
        'NXB Trẻ',
        'NXB Văn Hóa - Văn Nghệ',
    ],
};

function BodyContent() {
    const [showFilterAll, setShowFillterAll] = useState(false);
    const handleFilterAllDisplay = () => {
        setShowFillterAll(!showFilterAll);
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('sidebar')}>
                    <p className={cx('title')}>Explore by category</p>
                    <Category data={GENRES} />
                </div>
                <div className={cx('body')}>
                    <div className={cx('header')}>
                        <p className={cx('title')}>All categories</p>
                        <div className={cx('filters')}>
                            <FilterSection data={FILTER_SECTION_1} />
                            <FilterSection data={FILTER_SECTION_2} />
                            <div className={cx('filter_all')} onClick={handleFilterAllDisplay}>
                                <FontAwesomeIcon className={cx('filter_all_icon')} icon={faFilter} />
                                <p className={cx('filter_all_text')}>All</p>
                            </div>
                        </div>
                        <div className={cx('sorting')}>
                            <div className={cx('find_rating')}>
                                <input className={cx('checkbox_find_rating')} type="checkbox" />
                                <div className={cx('star_icons')}>
                                    <span className={cx('star_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className={cx('star_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className={cx('star_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className={cx('star_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className={cx('star_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                </div>
                                <p className={cx('find_rating_title')}>From 4 stars</p>
                            </div>
                            <div className={cx('sort_menu')}>
                                <SelectSort />
                            </div>
                        </div>
                    </div>
                    <div className={cx('core')}></div>
                </div>
            </div>
            {showFilterAll && (
                <FilterAllMenu
                    deal={FILTER_SECTION_1.items}
                    category={CATEGORY}
                    publishers={FILTER_SECTION_2.items}
                    handleFilterAllDisplay={handleFilterAllDisplay}
                />
            )}
        </div>
    );
}

export default BodyContent;

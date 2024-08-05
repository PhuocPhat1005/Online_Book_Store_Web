import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';

import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './BodyContent.module.scss';
import Category from './components/Category';
import FilterSection from './components/FilterSection';
import FilterAllMenu from './components/FilterAllMenu';
import { useEffect, useState } from 'react';
import SelectSort from './components/SelectSort';
import Products from './components/Products';
import request from '~/utils/request';

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

const BOOKS_PER_ROW = 5;

function BodyContent() {
    const [showFilterAll, setShowFillterAll] = useState(false);
    const handleFilterAllDisplay = () => {
        setShowFillterAll(!showFilterAll);
    };

    const [currentPage, setCurrentPage] = useState(0); // number
    const [showPages, setShowPages] = useState([1, 2, 3, 4, 5]); // number array
    const [books, setBooks] = useState([]); // object array
    const [imagesFetched, setImagesFetched] = useState(false);

    const handleBackPage = () => {
        if (currentPage < 0) return;
        else if (currentPage === 0 && showPages[0] > 1) {
            setShowPages(showPages.map((page) => page - 1));
            return;
        }

        setCurrentPage((prev) => prev - 1);

        // call API to url
    };

    const handleNextPage = () => {
        if (currentPage > 99) return;
        else if (currentPage === showPages.length - 1) {
            setShowPages(showPages.map((page) => page + 1));
            return;
        }

        setCurrentPage((prev) => prev + 1);

        // call API to url
    };

    useEffect(() => {
        // Ensure current page index is valid
        if (currentPage < 0) {
            setCurrentPage(0);
        } else if (currentPage >= showPages.length) {
            setCurrentPage(showPages.length - 1);
        }
    }, [currentPage, showPages]);

    // API for getting books
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const response = await request.get(`book/get_book_per_page/${(currentPage + 1).toString()}`);
                setBooks(response.data);
                setImagesFetched(false); // Reset the imagesFetched flag
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Form submission failed', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
            }
        };
        getAllBooks();
    }, [currentPage]);

    // API for getting book images
    useEffect(() => {
        const getBookImages = async (id) => {
            try {
                const response = await request.get('photoshow_photo', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        id_: id,
                    },
                });
                if (response.status === 200) {
                    return response.data;
                }
                return [];
            } catch (error) {
                if (error.response) {
                    console.error('Form submission failed', error.response.data);
                } else if (error.request) {
                    console.error('No response received', error.request);
                } else {
                    console.error('Error', error.message);
                }
                return [];
            }
        };

        const fetchImages = async () => {
            const updatedBooks = await Promise.all(
                books.map(async (book) => {
                    const images = await getBookImages(book.id);
                    return { ...book, images: images };
                }),
            );
            setBooks(updatedBooks);
            setImagesFetched(true); // Set the imagesFetched flag to true
        };

        if (books.length > 0 && !imagesFetched) {
            fetchImages();
        }
    }, [books, imagesFetched]);

    // Create an array of Products components
    const products = [];
    for (let i = 0; i < books.length; i += BOOKS_PER_ROW) {
        const booksSlice = books.slice(i, i + BOOKS_PER_ROW);
        products.push(<Products key={i} data={booksSlice} />);
    }

    return (
        <div className={cx('body-wrapper')}>
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
                    <div className={cx('core')}>{products}</div>
                </div>
                <div className={cx('footer')}>
                    <span className={cx('back_btn')} onClick={handleBackPage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <div className={cx('pages')}>
                        {showPages.map((item, index) => (
                            <a className={cx('page_item', { active: index === currentPage })} href="/" key={index}>
                                {item}
                            </a>
                        ))}

                        <span className={cx('page_item')}>...</span>
                    </div>
                    <span className={cx('next_btn')} onClick={handleNextPage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
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

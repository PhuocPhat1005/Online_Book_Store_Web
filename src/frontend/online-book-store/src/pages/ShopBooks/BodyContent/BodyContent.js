import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';

import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './BodyContent.module.scss';
import Category from './components/Category';
import FilterSection from './components/FilterSection';
import FilterAllMenu from './components/FilterAllMenu';
import { useEffect, useState } from 'react';
import SelectSort from './components/SelectSort';
import Products from './components/Products';
import request from '~/utils/request';
import { GENRES, CATEGORY, FILTER_SECTION_1, FILTER_SECTION_2 } from './components/Filter_Category';

const cx = classNames.bind(styles);

const BOOKS_PER_ROW = 5;

function BodyContent() {
    const [showFilterAll, setShowFillterAll] = useState(false);

    const handleFilterAllDisplay = () => {
        setShowFillterAll(!showFilterAll);
    };

    const [currentPage, setCurrentPage] = useState(0); // number
    const [showPages, setShowPages] = useState([1, 2, 3, 4, 5]); // number array
    const [books, setBooks] = useState([]); // object array
    // const [imagesFetched, setImagesFetched] = useState(false);

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
                // setImagesFetched(false); // Reset the imagesFetched flag
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

    // Item query filter
    const [checkedItems, setCheckedItems] = useState({
        deal: [],
        price: [],
        rating: [],
        category: [],
        publishers: [],
    });

    const handleCheckedItemsChange = (newCheckedItems) => {
        setCheckedItems(newCheckedItems);
    };

    // const fectchFillterApply = async () => {
    //     try {
    //         const response = await request.get('book/get_book_by_conditions', {
    //             params: {
    //                 price: parseInt()
    //             },
    //         });
    //     } catch (error) {}
    // };

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
                    checkedItems={checkedItems}
                    onCheckedItemsChange={handleCheckedItemsChange}
                    handleFilterAllDisplay={handleFilterAllDisplay}
                />
            )}
        </div>
    );
}

export default BodyContent;

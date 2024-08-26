import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './BodyContent.module.scss';
import Category from './components/GuestCategory/GuestCategory';
import FilterSection from './components/FilterSection';
import FilterAllMenu from './components/FilterAllMenu';
import { useEffect, useState } from 'react';
import SelectSort from './components/SelectSort';
import Products from './components/GuestProducts/GuestProducts';
import request from '~/utils/request';
import { GENRES, CATEGORY, FILTER_SECTION_1, FILTER_SECTION_2 } from './components/Filter_Category';
import BasicSpinner from '~/components/BasicSpinner';
import Button from '~/components/Button';
import PopUp from '~/components/PopUp';

const cx = classNames.bind(styles);

const BOOKS_PER_ROW = 5;

function BodyContent() {
    // Display & Manage the filter all
    const [showFilterAll, setShowFillterAll] = useState(false);
    const [isAppliedFilterAll, setIsAppliedFilterAll] = useState(false);
    const [conditionProducts, setConditionProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0); // number
    const [showPages, setShowPages] = useState([1, 2, 3, 4, 5]); // number array
    const [books, setBooks] = useState([]); // object array
    // const [imagesFetched, setImagesFetched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    // State to manage whether the PopUp is shown
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    // Open & close PopUp
    const handleButtonClick = () => {
        setIsPopUpVisible(true);
    };
    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
    };

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
                setIsLoading(true);

                const response = await request.get(`book/get_book_per_page/${(currentPage + 1).toString()}`);

                setBooks(response.data);
                setIsLoading(false);
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

    // Handle Price query
    const [priceFromQuery, setPriceFromQuery] = useState('');
    const [priceToQuery, setPriceToQuery] = useState('');
    const [rangePrice, setRangePrice] = useState([10e6, -1]);

    useEffect(() => {
        let minPrice = 10e6;
        let maxPrice = -1;
        for (let p of checkedItems.price) {
            if (p[0] === '<') {
                minPrice = 0;
                maxPrice = parseInt(p.slice(1));
                setPriceFromQuery(minPrice);
                setPriceToQuery(maxPrice);
            } else if (p[0] === '>') {
                minPrice = parseInt(p.slice(1));
                maxPrice = 10e6;
                setPriceFromQuery(minPrice);
                setPriceToQuery(maxPrice);
            } else {
                let temp_string_arr = p.split('-');
                minPrice = parseInt(temp_string_arr[0]);
                maxPrice = parseInt(temp_string_arr[1]);
                setPriceFromQuery(minPrice);
                setPriceToQuery(maxPrice);
            }
        }
        if (checkedItems.price.length !== 0) {
            minPrice = Math.min(rangePrice[0], minPrice);
            maxPrice = Math.max(rangePrice[1], maxPrice);
            setRangePrice([minPrice, maxPrice]);
        } else {
            setRangePrice([10e6, -1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFromQuery, priceToQuery, checkedItems.price]);

    const fectchFillterApply = async () => {
        try {
            let params = new URLSearchParams();
            params.append('price_from', rangePrice[0]);
            params.append('price_to', rangePrice[1]);

            const response = await request.get('book/get_book_by_conditions', {
                params: {
                    and_search_params: params,
                },
            });

            if (response.status === 200) {
                setConditionProducts(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isAppliedFilterAll === false) {
            return;
        }

        fectchFillterApply();
        setIsAppliedFilterAll(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAppliedFilterAll]);

    // Display & Manage the fillter all

    const handleFilterAllDisplay = () => {
        setShowFillterAll(!showFilterAll);
        setCheckedItems({ deal: [], price: [], rating: [], category: [], publishers: [] });
    };

    const handleApplyFilterAll = () => {
        setIsAppliedFilterAll(true);
        setShowFillterAll(false);
        setCheckedItems({ deal: [], price: [], rating: [], category: [], publishers: [] });
    };

    // Create an array of Products components
    const products = [];

    if (conditionProducts.length !== 0) {
        for (let i = 0; i < conditionProducts.length; i += BOOKS_PER_ROW) {
            const booksSlice = conditionProducts.slice(i, i + BOOKS_PER_ROW);
            products.push(<Products key={i} data={booksSlice} />);
        }
    } else {
        for (let i = 0; i < books.length; i += BOOKS_PER_ROW) {
            const booksSlice = books.slice(i, i + BOOKS_PER_ROW);
            products.push(<Products key={i} data={booksSlice} />);
        }
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
                    <div className={cx('core')}>
                        {!isLoading && (products || conditionProducts)}
                        {isLoading && <BasicSpinner color="#808080" />}
                    </div>
                </div>
                <div className={cx('footer')}>
                    {/* Change Button's onClick to trigger the PopUp */}
                    <Button onClick={handleButtonClick} className={cx('see-more-btn')} types="findmore">
                        See more results
                    </Button>
                </div>
                {/* Render PopUp conditionally based on the state */}
                {isPopUpVisible && <PopUp onClose={handleClosePopUp} />}
            </div>

            {showFilterAll && (
                <FilterAllMenu
                    deal={FILTER_SECTION_1.items}
                    category={CATEGORY}
                    publishers={FILTER_SECTION_2.items}
                    checkedItems={checkedItems}
                    onCheckedItemsChange={handleCheckedItemsChange}
                    handleFilterAllDisplay={handleFilterAllDisplay}
                    handleApplyFilterAll={handleApplyFilterAll}
                />
            )}
        </div>
    );
}

export default BodyContent;
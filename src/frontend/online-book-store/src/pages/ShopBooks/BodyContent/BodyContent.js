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
import BasicSpinner from '~/components/BasicSpinner';
import PopUpWithMessage from '~/components/PopUpWithMessage';

const cx = classNames.bind(styles);

const BOOKS_PER_ROW = 5;

function BodyContent() {
    // Display & Manage the fillter all
    const [showFilterAll, setShowFillterAll] = useState(false);
    const [isAppliedFilterAll, setIsAppliedFilterAll] = useState(false);
    const [conditionProducts, setConditionProducts] = useState([]);

    const [actualPage, setActualPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0); // number
    const [showPages, setShowPages] = useState([1, 2, 3, 4, 5, 6, 7, 8]); // number array
    const [books, setBooks] = useState([]); // object array

    // PopUpWithMessage states
    const [isPopUpWithMessageVisible, setIsPopUpWithMessageVisible] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    // const [imagesFetched, setImagesFetched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleCurrentPage = (page) => {
        setActualPage(page);
        setCurrentPage(page - 1);
    };

    const handleBackPage = () => {
        if (currentPage < 0) return;
        else if (currentPage === 0 && showPages[0] > 1) {
            setShowPages(showPages.map((page) => page - 1));
            setActualPage((prev) => prev - 1);
            return;
        }

        setActualPage((prev) => prev - 1);
        setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage > 99) return;
        else if (currentPage === showPages.length - 1) {
            setShowPages(showPages.map((page) => page + 1));
            setActualPage((prev) => prev + 1);
            return;
        }

        setActualPage((prev) => prev + 1);
        setCurrentPage((prev) => prev + 1);
    };

    useEffect(() => {
        // Ensure current page index is valid
        if (currentPage < 0) {
            setCurrentPage(0);
        } else if (currentPage >= showPages.length) {
            setCurrentPage(showPages.length - 1);
        }
    }, [currentPage, showPages]);

    // useEffect(() => {
    //     console.log(actualPage);
    // }, [actualPage]);

    // API for getting books
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                setIsLoading(true);

                const response = await request.get(`book/get_book_per_page/${actualPage.toString()}`);

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
    }, [actualPage]);

    const fetchRatingOutside = async () => {
        try {
            const response = await request.get(
                `book/get_book_by_conditions?and_search_params=rate=${4}&equal_condition=1`,
            );

            if (response.status === 200) {
                setConditionProducts(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    const fectchFillterApplyPrice = async () => {
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
                if (response.data.length === 0) {
                    setPopUpMessage('No books satisfy the filter requirements.');
                    setIsPopUpWithMessageVisible(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isAppliedFilterAll === false) {
            return;
        }

        fectchFillterApplyPrice();
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
    // let products = [];
    const [products, setProducts] = useState([]);

    // if (conditionProducts.length !== 0) {
    //     products = [];
    //     for (let i = 0; i < conditionProducts.length; i += BOOKS_PER_ROW) {
    //         const booksSlice = conditionProducts.slice(i, i + BOOKS_PER_ROW);
    //         products.push(<Products key={i} data={booksSlice} />);
    //     }
    // } else {
    //     products = [];
    //     for (let i = 0; i < books.length; i += BOOKS_PER_ROW) {
    //         const booksSlice = books.slice(i, i + BOOKS_PER_ROW);
    //         products.push(<Products key={i} data={booksSlice} />);
    //     }
    // }

    useEffect(() => {
        setProducts([]);
        console.log('Books');
        console.log(books);

        for (let i = 0; i < books.length; i += BOOKS_PER_ROW) {
            const booksSlice = books.slice(i, i + BOOKS_PER_ROW);
            setProducts((prev) => [...prev, <Products key={i} data={booksSlice} />]);
        }
    }, [books]);

    useEffect(() => {
        setProducts([]);
        console.log('condition');
        console.log(conditionProducts);

        for (let i = 0; i < conditionProducts.length; i += BOOKS_PER_ROW) {
            const booksSlice = conditionProducts.slice(i, i + BOOKS_PER_ROW);
            setProducts((prev) => [...prev, <Products key={i} data={booksSlice} />]);
        }
    }, [conditionProducts]);

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
                                <input
                                    className={cx('checkbox_find_rating')}
                                    type="checkbox"
                                    onChange={fetchRatingOutside}
                                />
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
                    <span className={cx('back_btn')} onClick={handleBackPage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <div className={cx('pages')}>
                        {showPages.map((item, index) => (
                            <p
                                className={cx('page_item', { active: index === currentPage })}
                                key={index}
                                onClick={() => handleCurrentPage(item)}
                            >
                                {item}
                            </p>
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
                    handleApplyFilterAll={handleApplyFilterAll}
                />
            )}

            {isPopUpWithMessageVisible && (
                <PopUpWithMessage message={popUpMessage} onClose={() => setIsPopUpWithMessageVisible(false)} />
            )}
        </div>
    );
}

export default BodyContent;

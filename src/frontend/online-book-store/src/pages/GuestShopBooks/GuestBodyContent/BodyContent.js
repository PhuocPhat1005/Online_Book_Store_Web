import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import styles from './BodyContent.module.scss';
import Category from './components/GuestCategory/GuestCategory';
import FilterSection from './components/FilterSection';
import FilterAllMenu from './components/FilterAllMenu';
import SelectSort from './components/SelectSort';
import Products from './components/GuestProducts/GuestProducts';
import request from '~/utils/request';
import { GENRES, CATEGORY, FILTER_SECTION_1, FILTER_SECTION_2 } from './components/Filter_Category';
import BasicSpinner from '~/components/BasicSpinner';
import Button from '~/components/Button';
import PopUp from '~/components/PopUp';

const cx = classNames.bind(styles);

const BOOKS_PER_ROW = 5;
const GUEST_BOOKS_PER_PAGE = 10;

function BodyContent() {
    // Display & Manage the filter all
    const [showFilterAll, setShowFillterAll] = useState(false);
    const [isAppliedFilterAll, setIsAppliedFilterAll] = useState(false);

    const [currentPage] = useState(0); // number
    const [books, setBooks] = useState([]); // object array
    const [filteredBooks, setFilteredBooks] = useState([]); // object array for filtered books
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

    // API for getting books
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                setIsLoading(true);

                const response = await request.get(`book/get_book_per_page/${(currentPage + 1).toString()}`);

                // Slice the array and keep only first 10 books
                const limitedBooks = response.data.slice(0, GUEST_BOOKS_PER_PAGE);
                setBooks(limitedBooks);
                setFilteredBooks(limitedBooks); // FilteredBooks array is the same as books array
                setIsLoading(false);
            } catch (error) {
                if (error.response) {
                    console.error('Form submission failed', error.response.data);
                } else if (error.request) {
                    console.error('No response received', error.request);
                } else {
                    console.error('Error', error.message);
                }
                setIsLoading(false);
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

    // Filter only the books that were kept (limitedBooks)
    const fectchFillterApply = () => {
        let filtered = books;

        // Apply price range filter
        if (rangePrice[0] !== 10e6 || rangePrice[1] !== -1) {
            filtered = filtered.filter((book) => book.price >= rangePrice[0] && book.price <= rangePrice[1]);
        }

        // Apply other filters like category, rating, etc.
        if (checkedItems.category.length) {
            filtered = filtered.filter((book) => checkedItems.category.includes(book.category_id));
        }

        if (checkedItems.rating.length) {
            filtered = filtered.filter((book) => checkedItems.rating.includes(book.rating));
        }

        setFilteredBooks(filtered);
    };

    useEffect(() => {
        if (isAppliedFilterAll) {
            fectchFillterApply();
            setIsAppliedFilterAll(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAppliedFilterAll]);

    // Display & Manage the filter all
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

    if (filteredBooks.length !== 0) {
        for (let i = 0; i < filteredBooks.length; i += BOOKS_PER_ROW) {
            const booksSlice = filteredBooks.slice(i, i + BOOKS_PER_ROW);
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
                        {!isLoading && products}
                        {isLoading && <BasicSpinner color="#808080" />}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button onClick={handleButtonClick} className={cx('see-more-btn')} types="findmore">
                        See more results
                    </Button>
                </div>
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

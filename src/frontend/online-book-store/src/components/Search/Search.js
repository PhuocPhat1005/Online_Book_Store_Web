import { useState, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import { faMagnifyingGlass, faSpinner, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import BookItem from '~/components/BookItem';
import { useDebounce } from '~/hooks';
import { useNavigate } from 'react-router-dom';

import request from '~/utils/request';
import config from '~/config';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFocusResult, setIsFocusResult] = useState(true);
    const debounce = useDebounce(searchValue, 500);
    const navigate = useNavigate();

    const inputRef = useRef(null);

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const clearSearchValue = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleClickOutside = () => {
        setIsFocusResult(false);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchSearchResult = async () => {
            try {
                const response = await request.get(`book/get_book_by_name/${encodeURIComponent(debounce)}`);
                if (response.status === 200) {
                    setSearchResult(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };
        fetchSearchResult();
    }, [debounce]);

    const renderSearchResult = (attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <h4 className={cx('search-title')}>Products</h4>
                <div className={cx('product_search_body')}>
                    {searchResult.map((item, index) => (
                        <BookItem key={item.id} data={item} onClick={() => handleClickABook(index)} />
                    ))}
                </div>
            </PopperWrapper>
        </div>
    );

    const handleClickABook = async (index) => {
        try {
            const response = await request.get(
                `book/get_book_by_conditions?and_search_params=book_name=${searchResult[index].Book_name}&equal_condition=0`,
            );
            if (response.status === 200) {
                const bookId = response.data[0].id;

                try {
                    const responseBook = await request.get(`book/get_book/${bookId}`);

                    if (responseBook.status === 200) {
                        const sendedData = {
                            ...responseBook.data.Book,
                            author: [responseBook.data.Author[0].Full_name],
                            translator: [responseBook.data.Translator[0].Full_name],
                        };

                        navigate(config.routes.detailsbook, { state: { bookData: sendedData } });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Tippy
            offset={[0, 10]}
            visible={isFocusResult && searchResult.length > 0}
            interactive
            placement="bottom"
            render={renderSearchResult}
            onClickOutside={handleClickOutside}
        >
            <div className={cx('search-bar')}>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                    spellCheck="false"
                    value={searchValue}
                    onChange={(event) => handleSearchValue(event)}
                    onFocus={() => setIsFocusResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={clearSearchValue}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;

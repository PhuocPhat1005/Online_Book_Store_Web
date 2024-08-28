import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './BookSettings.scss';
import request from '../../utils/request';
import config from '../../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const cx = classNames.bind(styles);

//table css in src/components/GlobalStyles/GlobalStyles.scss

const BookSettings = ({ admin }) => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
      if (admin) {
          navigate(route);
      }
  };
  let page = 1;
  let max_page = 100;
  const BOOKS_PER_ROW = 1; // number
  // Display & Manage the fillter all

  const [conditionProducts, setConditionProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // number
  const [showPages, setShowPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // number array
  const [books, setBooks] = useState([]); // object array
  // const [imagesFetched, setImagesFetched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentPage = (page) => {
      setCurrentPage(page - 1);
  };

  const handleBackPage = () => {
      if (currentPage < 0) return;
      else if (currentPage === 0 && showPages[0] > 1) {
          setShowPages(showPages.map((page) => page - 1));
          return;
      }

      setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
      if (currentPage > 99) return;
      else if (currentPage === showPages.length - 1) {
          setShowPages(showPages.map((page) => page + 1));
          return;
      }

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

  // API for getting books
  useEffect(() => {
    const getAllBooks = async () => {
      try {
        setIsLoading(true);
        const response = await request.get(`book/get_book_per_page/${(currentPage + 1).toString()}`);
        const jsonResponse = await response.json();
        setBooks(jsonResponse.data);
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

  // Create an array of Products components
  const products = [];

  if (conditionProducts.length !== 0) {
    for (let i = 0; i < conditionProducts.length; i += BOOKS_PER_ROW) {
      const booksSlice = conditionProducts.slice(i, i + BOOKS_PER_ROW);
      // products.push(<Products key={i} data={booksSlice} />);
    }
  } else {
    for (let i = 0; i < books.length; i += BOOKS_PER_ROW) {
      const booksSlice = books.slice(i, i + BOOKS_PER_ROW);
      // products.push(<Products key={i} data={booksSlice} />);
    }
  }

  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   setLoading(true)
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response => response.json())
  //     .then(json => setUsers(json))
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])

  return (
    <>
      <div className={cx('book-settings')}>
        <div className={cx('book-settings-filter')}>
          <Button className={cx('page-btn-book')} onClick={() => {}}>
            <p>|&lt;</p>
          </Button>
          <Button className={cx('page-btn-book')} onClick={() => {page-=1}}>
            <p>&lt;&lt;</p>
          </Button>
          <div className={cx('page-box-book')}>Page: {page}/{max_page}</div>
          {/* <input className={cx('page-box')} type="text" id="name" placeholder="Page: "/> */}
          <Button className={cx('page-btn-book')} onClick={() => {}}>
            <p>&lt;&lt;</p>
          </Button>
          <Button className={cx('page-btn-book')} onClick={() => {}}>
            <p>&gt;|</p>
          </Button>
          {/* <Link to={config.routes.dashboards} className={cx('add-book-btn')}>
            <p><FontAwesomeIcon icon={faPlusCircle} /> Add book</p>
          </Link> */}
          <Button to={config.routes.addBook} className={cx('add-book-btn')} onClick={() => handleNavigate(config.routes.addBook)}>
            <p><FontAwesomeIcon icon={faPlusCircle} /> Add book</p>
          </Button>
        </div>
        <div className="App">
          <table border={1}>
            <tr>
              <th>ISBN</th>
              <th>Book's name</th>
              <th>Create at</th>
              <th>Update at</th>
              <th>Price</th>
              <th>See detail</th>
            </tr>
            {showPages.map((item, index) => (
              <tr key={index}>
                <td>{item.isbn}</td>
                <td>{item.book_name}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default BookSettings;

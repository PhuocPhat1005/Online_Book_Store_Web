import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './Dashboards.scss';
import config from '../../config';
import request from '../../utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';


const cx = classNames.bind(styles);

function Dashboards( {data} ) {
  const [itemOrder, setDataItem] = useState(data);
  const navigate = useNavigate();
  const handleNavigate = (route, state) => {
    navigate(route, { state: { orderData: state } });
  };

  const [currentPage, setCurrentPage] = useState(0); // number
  const [showPages, setShowPages] = useState([1]); // number array
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]); // object array
  const [orderInfor, setOrderInfor] = useState(false);
  
  const handleCurrentPage = (page) => {
    setCurrentPage(page - 1);
  };
  const handleFirstPage = () => {
      if (currentPage < 0) return;
      else if (currentPage === 0 && showPages[0] > 1) {
          setShowPages(showPages.map((page) => 0));
          return;
      }
      setCurrentPage((prev) => 0);
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
  const handleLastPage = () => {
      if (currentPage > 99) return;
      else if (currentPage === showPages.length - 1) {
          setShowPages(showPages.map((page) => showPages.length - 1));
          return;
      }
      setCurrentPage((prev) => showPages.length - 1);
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
        const response = await request.get(`admin/show_top_10_best_selling_books`);
        console.log(response.data);
        setBooks(response.data);
        setIsLoading(false);
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
  return (
    <>
      <div className={cx('dashboards')}>
        <div>
          <div className="App">
            <table class="table3" border={1}>
              <tr>
                <th>Book ID</th>
                <th>Book name</th>
                <th>Price</th>
                <th>Language</th>
                <th>Rate</th>
              </tr>
              {books.map((itemOrder, index) => (
                <tr key={showPages.id}>
                  <td>{itemOrder.id}</td>
                  <td>{itemOrder.book_name}</td>
                  <td>{itemOrder.price} VND</td>
                  <td>{itemOrder.language}</td>
                  <td>{itemOrder.rate}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboards;

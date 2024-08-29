import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './AddBook.scss';
import config from '../../config';
import request from '../../utils/request';
import axios from 'axios';
import assets from '../../assets';
import DefaultImage from "../../assets/Common/null_book_cover.jpg";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

// store book ava
let book_id = "";

const AddBook = ({ admin }) => {
  // let DefaultImage = document.createElement("img");
  // DefaultImage.src = assets.empty_cart;
  const navigate = useNavigate();
  const handleNavigate = (route) => {
      if (admin) {
          navigate(route);
      }
  };
  const [bookImgURL, setBookImgURL] = useState(DefaultImage);

  const [posts, setPosts] = useState({
    isbn: "",
    book_name: "",
    author_name: "",
    category_name: "",
    publisher_name: "",
    publishing_date: "",
    price: "",
    language: "",
    translator_name: "",
    book_cover_type: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const {isbn, book_name, author_name, category_name, publisher_name,
    publishing_date, price, language, translator_name,
    book_size, page_number, book_cover_type, description} = posts;

  const handleChange = (event) => {
    setPosts({ ...posts, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const add_book_data = {
      id: "empty_uuid",
      isbn: formData.get('isbn'),
      book_name: formData.get('book_name'),
      // author_name: formData.get('author_name'),
      // category_name: formData.get('category_name'),
      // publisher_name: formData.get('publisher_name'),
      sale_off: "empty_uuid",
      publishing_date: formData.get('publishing_date'),
      price: formData.get('price'),
      language: formData.get('language'),
      book_size: formData.get('book_size'),
      page_number: formData.get('page_number'),
      book_cover_type: formData.get('book_cover_type'),
      book_ava: "",
      amount_sell: 0,
      amount_rate: 0,
      rate: 5,
      // translator_name: formData.get('translator_name'),
      description: formData.get('description'),
    };
    let today = new Date().toISOString().slice(0, 10)
    if (add_book_data.publishing_date === "") {
      add_book_data.publishing_date = today;
    }
    if (add_book_data.price === "") {
      add_book_data.price = "0.0";
    }
    if (add_book_data.page_number === "") {
      add_book_data.page_number = "0";
    }
    try {
      const response = await request.post('book/create_book', add_book_data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
          console.log('Form submitted successfully');
          book_id = response.data;
          console.log(response.data);
          navigate(config.routes.bookSettings);
      } else {
          // Handle errors
          // setToggleToast(false);
          console.error('Form submission failed', response.data);
      }
  } catch (error) {
      // setIsLoading(false);

      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Form submission failed', error.response.data);

          // setToggleToast(false);
          // setIncorrectMess(error.response.data.detail);
      } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received', error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
      }
    }
    // if (isbn && book_name && author_name && category_name &&
    // publisher_name && publishing_date && price && language &&
    // translator && book_cover_type && description) {
    //   // axios.post('https://jsonplaceholder.typicode.com/posts', posts)
    //   axios.post('book/create_book_db/', posts)
    //     // .then(res => console.log('AAA', res.data))
    //     .then(res => {
    //       console.log(res);
    //       console.log(res.data);
    //         // setData([...data, res.data]);
    //         // setPosts({ isbn: "", book_name: "", author_name: "", category_name: "",
    //         //   publisher_name: "", publishing_date: "", price: "", language: "",
    //         //   translator: "", book_cover_type: "", description: ""});

    //     })
    //     .catch(err => console.log(err))

    // }
  };
// const handleUpdate = () => {
//   if (isbn && book_name && author_name && category_name &&
//     publisher_name && publishing_date && price && language &&
//     translator && book_cover_type && description) {
//       axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, posts)
//           .then(res => {
//             setPosts({ isbn: "", book_name: "", author_name: "", category_name: "",
//               publisher_name: "", publishing_date: "", price: "", language: "",
//               translator: "", book_cover_type: "", description: ""});
//             setRefresh(refresh + 1)
//           })
//           .catch(err => console.log(err))

//   }
// };
  // const submitForm = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post(`https://jsonplaceholder.typicode.com/users`, { posts })
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //     });
  // };

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('book_id', book_id);

    try {
      const response = await axios.post('photo/uploadfiles', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Form submission failed', error.response.data);
      } else if (error.request) {
        console.error('No response received', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImageDisplay(file);
    }
  };

  
  // const fileUploadRef = useRef();

  // const handleImageUpload = (event) => {
  //   event.preventDefault();
  //   fileUploadRef.current.click();
  //   console.log('Upload image');
  // }
  // const uploadImageDisplay = async () => {
  //   try {
  //   const response = await request.post('photo/uploadfiles', book_id, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.status === 200) {
  //       console.log('Form submitted successfully');
  //   } else {
  //       console.error('Form submission failed', response.data);
  //   }
  //   } catch (error) {

  //   if (error.response) {
  //       console.error('Form submission failed', error.response.data);
  //   } else if (error.request) {
  //       console.error('No response received', error.request);
  //   } else {
  //       console.error('Error', error.message);
  //   }
  // }}
  //   try {
  //     const uploadedFile = fileUploadRef.current.files[0];
  //     const formData = new FormData();
  //     formData.append("file", uploadedFile);
      
  //     const cachedURL = URL.createObjectURL(uploadedFile);
  //     setBookImgURL(cachedURL);

  //     // const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
  //     //   method: "post",
  //     //   body: formData
  //     // });

  //     // if (response.status === 201) {
  //     //   const data = await response.json();
  //     //   setBookImgURL(data?.location);
  //     // }
  //     } catch(error) {
  //       console.error(error);
  //       setBookImgURL(DefaultImage);
  //     }
  // }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.addPost(isbn, book_name, author_name, category_name, publisher_name, publishing_date, price, language, translator, book_cover_type, description);
  //   setIsbn('');
  //   setBookname('');
  //   setAuthorname('');
  //   setCategory('');
  //   setPublisher('');
  //   setPublishingdate('');
  //   setPrice('');
  //   setLanguage('');
  //   setTranslator('');
  //   setBookcover('');
  //   setDescription('');
  // };
  // const addPost = async(title, body) => {
  //   const response = await client.post('', {
  //     isbn,
  //     book_name,
  //     author_name,
  //     category_name,
  //     publisher_name,
  //     publishing_date,
  //     price,
  //     language,
  //     translator,
  //     book_cover_type,
  //     description
  //   });
  //   setPosts((prevPosts) => [response.data, ...prevPosts])
  // };
  return (
    <>
      <div className={cx('add-book')}>
        <div className={cx('add-book-header')}>
          <Button to={config.routes.bookSettings} className={cx('back-btn')} onClick={() => handleNavigate(config.routes.bookSettings)}>
            <p><FontAwesomeIcon icon={faCircleLeft} /> Back</p>
          </Button>
          {/* <p className={cx('isbn-show')}>ISBN: {}</p> */}
        </div>
        <div className={cx('add-book-info')}>
          <div className={cx('add-book-info-img')}>
            <img 
              className={cx('img-size')}
              src={bookImgURL}
              alt ="bookImg"/>

            <form id="form" encType='multipart/form-data'>
              <label for="file" className={cx('upload-img-label')}>Edit book's cover</label>
              <button
                type='submit'
                className={cx('upload-img-btn')}
                onClick={handleImageUpload}
                >
                <p><FontAwesomeIcon icon={faArrowUpFromBracket}/> Upload</p>
              </button>
              <input 
                type="file"
                id="file"
                ref={fileUploadRef}
                className={cx('img-size')}
                onChange={uploadImageDisplay}
                onload="resizeImg(this, 400, 600);"
                hidden />
            </form>
          </div>
          {/* <form onSubmit={handleSubmit}  encType='multipart/form-data'> */}
          <form onSubmit={handleSubmit}>
            {/* <img 
              className={cx('img-size')}
              src={bookImgURL}
              alt ="bookImg"/> */}
            {/* <form id="form" encType='multipart/form-data'> */}
              {/* <div className={cx('add-book-info-img')}>
                <label for="file" className={cx('upload-img-label')}>Edit book's cover</label>
                <button
                  type='submit'
                  className={cx('upload-img-btn')}
                  // onClick={handleImageUpload}
                  >
                  <p><FontAwesomeIcon icon={faArrowUpFromBracket}/> Upload</p>
                </button>
                <input 
                  type="file"
                  id="file"
                  ref={fileUploadRef}
                  // onChange={uploadImageDisplay}
                  onload="resizeImg(this, 400, 600);"
                  hidden />
              </div> */}
            {/* </form> */}
            <div className={cx('add-book-info-text')}>
              <label for="isbn" className={cx('box-name')}>ISBN</label>
              <input type="text1"
                id="isbn"
                name="isbn"
                value={isbn}
                onChange={handleChange}
                // onChange={HandleIsbnChange}
                placeholder="E.g. 978-0-545-01022-1"></input>
              <label for="book_name" className={cx('box-name')}>Book's Name</label>
              <input type="text1"
                id="book_name"
                name="book_name"
                value={book_name}
                onChange={handleChange}
                // onChange={HandleBooknameChange}
                placeholder="E.g. THÓI QUEN THÀNH CÔNG"></input>
              <label for="author_name" className={cx('box-name')}>Author's Name</label>
              <input type="text1"
                id="author_name"
                name="author_name"
                value={author_name}
                onChange={handleChange}
                // onChange={HandleAuthornameChange}
                placeholder="E.g. NAPOLEON HILL"></input>
              <label for="category_name" className={cx('box-name')}>Category</label>
              <input type="text1"
                id="category_name"
                name="category_name"
                value={category_name}
                onChange={handleChange}
                // onChange={HandleCategoryChange}
                placeholder="E.g. Inspire"></input>
              <label for="publisher_name" className={cx('box-name')}>Publisher</label>
              <input type="text1"
                id="publisher_name"
                name="publisher_name"
                value={publisher_name}
                onChange={handleChange}
                // onChange={HandlePublisherChange}
                placeholder="E.g. Nhà xuất bản trẻ"></input>
              <label for="publishing_date" className={cx('box-name')}>Publishing date</label>
              <input type="text1"
                id="publishing_date"
                name="publishing_date"
                value={publishing_date}
                onChange={handleChange}
                // onChange={HandlePublishingdateChange}
                placeholder="E.g. YYYY-MM-DD"></input>
              <label for="price" className={cx('box-name')}>Price</label>
              <input type="text1"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                // onChange={HandlePriceChange}
                placeholder="E.g. 250000"></input>
              <label for="language" className={cx('box-name')}>Language</label>
              <input type="text1"
                id="language"
                name="language"
                value={language}
                onChange={handleChange}
                // onChange={HandleLanguageChange}
                placeholder="E.g. Vietnamese"></input>
              <label for="translator" className={cx('box-name')}>Translator</label>
              <input type="text1"
                id="translator_name"
                name="translator_name"
                value={translator_name}
                onChange={handleChange}
                // onChange={HandleTranslatorChange}
                placeholder="E.g. Nhiều dịch giả (First News)"></input>
              <label for="book_size" className={cx('box-name')}>Book size</label>
              <input type="text1"
                id="book_size"
                name="book_size"
                value={book_size}
                onChange={handleChange}
                // onChange={HandleTranslatorChange}
                placeholder="E.g. 16 x 24"></input>
              <label for="page_number" className={cx('box-name')}>Page number</label>
              <input type="text1"
                id="page_number"
                name="page_number"
                value={page_number}
                onChange={handleChange}
                // onChange={HandleTranslatorChange}
                placeholder="E.g. 149"></input>
              <label for="book_cover_type" className={cx('box-name')}>Book's cover</label>
              <input type="text1"
                id="book_cover_type"
                name="book_cover_type"
                value={book_cover_type}
                onChange={handleChange}
                // onChange={HandleBookcoverChange}
                placeholder="E.g. Soft cover"></input>
              <label for="description" className={cx('box-name')}>Description</label>
              <textarea type="text2" id="description" name="description" value={description} 
              onChange={handleChange}
              // onChange={HandleDescriptionChange}
              // class="description-box"
              placeholder=
              "E.g. Cuốn sách chia sẻ những thói quen và nguyên tắc để đạt được thành công trong sự nghiệp và cuộc sống, dựa trên nghiên cứu và phỏng vấn các doanh nhân thành công.">
              </textarea>
              {/* <Button to={config.routes.bookSettings} className={cx('add-book-submit-btn')} onClick={() => handleNavigate(config.routes.bookSettings)}> */}
              <Button className={cx('add-book-submit-btn')}
              // onClick="handleSubmit(event)" >
              // onClick={handleSubmit}>
              >
                <p>Add book</p>
              </Button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  );
}
  
export default AddBook;
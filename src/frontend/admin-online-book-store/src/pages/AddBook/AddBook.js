import classNames from 'classnames/bind';
import Button from '../../components/Button';
import styles from './AddBook.scss';
import config from '../../config';
import axios from 'axios';
import assets from '../../assets';
import DefaultImage from "../../assets/Common/null_book_cover.jpg";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


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
  // const [isbn, setIsbn] = useState("");
  // const [book_name, setBookname] = useState("");
  // const [authorname, setAuthorname] = useState("");
  // const [category, setCategory] = useState("");
  // const [publisher, setPublisher] = useState("");
  // const [publishing_date, setPublishingdate] = useState("");
  // const [price, setPrice] = useState("");
  // const [language, setLanguage] = useState("");
  // const [translator, setTranslator] = useState("");
  // const [book_cover_type, setBookcover] = useState("");
  // const [description, setDescription] = useState("");
  // const [posts, setPosts] = useState([]);
    
  // function HandleIsbnChange(event){
  //   setIsbn(event.target.value);
  // }
  // function HandleBooknameChange(event){
  //   setBookname(event.target.value);
  // }
  // function HandleAuthornameChange(event){
  //   setAuthorname(event.target.value);
  // }
  // function HandleCategoryChange(event){
  //   setCategory(event.target.value);
  // }
  // function HandlePublisherChange(event){
  //   setPublisher(event.target.value);
  // }
  // function HandlePublishingdateChange(event){
  //   setPublishingdate(event.target.value);
  // }
  // function HandlePriceChange(event){
  //   setPrice(event.target.value);
  // }
  // function HandleLanguageChange(event){
  //   setLanguage(event.target.value);
  // }
  // function HandleTranslatorChange(event){
  //   setTranslator(event.target.value);
  // }
  // function HandleBookcoverChange(event){
  //   setBookcover(event.target.value);
  // }
  // function HandleDescriptionChange(event){
  //   setDescription(event.target.value);
  // }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // props.addPost(title, body);
  //   setIsbn("");
  //   setBookname("");
  //   setAuthorname("");
  //   setCategory("");
  //   setPublisher("");
  //   setPublishingdate("");
  //   setPrice("");
  //   setLanguage("");
  //   setTranslator("");
  //   setBookcover("");
  //   setDescription("");
  // };
  // const addPost = async(isbn, bookmane, authorname, category,
  //   publisher, publishing_date, price, language,
  //   translator, book_cover_type, description) => {
  //   const response = await client.post('', {
  //     title,
  //     body,
  //   });
  //   setPosts((prevPosts) => [response.data, ...prevPosts])
  // };
  // setPosts({
  //   isbn: event.target.value,
  //   book_name: event.target.value,
  //   authorname: event.target.value,
  //   category: event.target.value,
  //   publisher: event.target.value,
  //   publishing_date: event.target.value,
  //   price: event.target.value,
  //   language: event.target.value,
  //   translator: event.target.value,
  //   book_cover_type: event.target.value,
  //   description: event.target.value,
  // });

  const [posts, setPosts] = useState({
    isbn: "",
    book_name: "",
    authorname: "",
    category: "",
    publisher: "",
    publishing_date: "",
    price: "",
    language: "",
    translator: "",
    book_cover_type: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const {isbn, book_name, authorname, category, publisher,
    publishing_date, price, language, translator,
    book_cover_type, description} = posts;

  const handleChange = (event) => {
    setPosts({ ...posts, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isbn && book_name && authorname && category &&
      publisher && publishing_date && price && language &&
      translator && book_cover_type && description) {
        // axios.post('https://jsonplaceholder.typicode.com/posts', posts)
        axios.post('book/create_book_db/', posts)
          // .then(res => console.log('AAA', res.data))
          .then(res => {
            console.log(res);
            console.log(res.data);
              // setData([...data, res.data]);
              // setPosts({ isbn: "", book_name: "", authorname: "", category: "",
              //   publisher: "", publishing_date: "", price: "", language: "",
              //   translator: "", book_cover_type: "", description: ""});

          })
          .catch(err => console.log(err))

    }
};
// const handleUpdate = () => {
//   if (isbn && book_name && authorname && category &&
//     publisher && publishing_date && price && language &&
//     translator && book_cover_type && description) {
//       axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, posts)
//           .then(res => {
//             setPosts({ isbn: "", book_name: "", authorname: "", category: "",
//               publisher: "", publishing_date: "", price: "", language: "",
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
  }
  const uploadImageDisplay = async () => {
  try {
    const uploadedFile = fileUploadRef.current.files[0];
    const formData = new FormData();
    formData.append("file", uploadedFile);
    
    // const cachedURL = URL.createObjectURL(uploadedFile);
    // setBookImgURL(cachedURL);

    const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
      method: "post",
      body: formData
    });

    if (response.status === 201) {
      const data = await response.json();
      setBookImgURL(data?.location);
    }
    } catch(error) {
      console.error(error);
      setBookImgURL(DefaultImage);
    }
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.addPost(isbn, book_name, authorname, category, publisher, publishing_date, price, language, translator, book_cover_type, description);
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
  //     authorname,
  //     category,
  //     publisher,
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
                onClick={handleImageUpload}> 
                <p><FontAwesomeIcon icon={faArrowUpFromBracket}/> Upload</p>
              </button>
              <input 
                type="file"
                id="file"
                ref={fileUploadRef}
                onChange={uploadImageDisplay}
                onload="resizeImg(this, 400, 600);"
                hidden />
            </form>
          </div>
          <div className={cx('add-book-info-text')}>
          <form  onSubmit={handleSubmit}>
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
            <label for="authorname" className={cx('box-name')}>Author's Name</label>
            <input type="text1"
              id="authorname"
              name="authorname"
              value={authorname}
              onChange={handleChange}
              // onChange={HandleAuthornameChange}
              placeholder="E.g. NAPOLEON HILL"></input>
            <label for="category" className={cx('box-name')}>Category</label>
            <input type="text1"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              // onChange={HandleCategoryChange}
              placeholder="E.g. Inspire"></input>
            <label for="publisher" className={cx('box-name')}>Publisher</label>
            <input type="text1"
              id="publisher"
              name="publisher"
              value={publisher}
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
              placeholder="E.g. 01/02/2018"></input>
            <label for="price" className={cx('box-name')}>Price</label>
            <input type="text1"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
              // onChange={HandlePriceChange}
              placeholder="E.g. 250,000 VND"></input>
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
              id="translator"
              name="translator"
              value={translator}
              onChange={handleChange}
              // onChange={HandleTranslatorChange}
              placeholder="E.g. Nhiều dịch giả (First News)"></input>
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
            onClick={handleSubmit}>
              <p>Add book</p>
            </Button>
          </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
  
  export default AddBook;
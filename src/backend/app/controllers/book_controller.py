from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, query_string_to_dict, query_in_db_by_id
from app.services.book_service import generate_all_variations

from app.schemas.book import BookCreate, BookUpdate
from app.schemas.book_author import Book_Author_Create, Book_Author_Update
from app.schemas.book_translator import Book_Translator_Create, Book_Translator_Update
from app.models.book import Book
from app.models.category import Category
from app.models.publishing_company import PublishingCompany
from app.models.author import Author
from app.models.translator import Translator
from app.models.book_author import BookAuthor
from app.models.book_translator import BookTranslator
from app.models.book_photo import BookPhoto
from app.models.sale_off import SaleOff
from app.database.database import get_db
from uuid import UUID

from app.controllers.photo_controller import delete_folder_aws #SERVICE

router = APIRouter()
book_service = CRUDService[Book, BookCreate, BookUpdate](Book)
book_author_service = CRUDService[BookAuthor, Book_Author_Create, Book_Author_Update](BookAuthor)
book_translator_service = CRUDService[BookTranslator, Book_Translator_Create, Book_Translator_Update](BookTranslator)

async def find_book_author(book_id: str, db: AsyncSession):
    book_author = await book_author_service.get_by_condition([{'book_id':book_id}], db)
    if not book_author:
        return "Can not find author of this book"
    else:
        author_id = book_author[0].author_id
        db_objs = await query_in_db_by_id(db, Author, author_id)
        author_data = []
        for db_obj in db_objs:
            author_data.append({"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name})
    return author_data

async def find_book_translator(book_id: str, db: AsyncSession):
    book_translator = await book_translator_service.get_by_condition([{'book_id':book_id}], db)
    if not book_translator:
        return "Can not find translator of this book"
    else:
        translator_id = book_translator[0].translator_id
        db_objs = await query_in_db_by_id(db, Translator, translator_id)
        translator_data = []
        for db_obj in db_objs:
            translator_data.append({"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name})
    return translator_data

async def find_book_catrgory(category_id: str, db: AsyncSession):
    category = await query_in_db_by_id(db, Category, category_id)
    if not category:
        return "Can not find category of this book"
    else:
        category = category[0].category_name
    return category

async def find_publishing_company(publishing_company_id: str, db: AsyncSession):
    publishing_company = await query_in_db_by_id(db, PublishingCompany, publishing_company_id)
    if not publishing_company:
        return "Can not find publishing company of this book"
    else:
        publishing_company = publishing_company[0].publishing_company_name
    return publishing_company

async def find_book_sale_off(sale_off_id: str, db: AsyncSession):
    sale_off = await query_in_db_by_id(db, SaleOff, sale_off_id)
    if not sale_off:
        return 0
    else:
        sale_off = sale_off[0].sale_off
    return sale_off
    
@router.post("/create_book", summary="Create a new book")
async def create_book_endpoint(book: BookCreate, db: AsyncSession = Depends(get_db)):
    return await book_service.create(book, db)


@router.get("/get_book/{book_id}", summary="Get a book by ID")
async def get_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.get_by_condition([{'id':book_id}], db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book_translator = await find_book_translator(book_id, db)
    book_author = await find_book_author(book_id, db)
    book_sale_off = await find_book_sale_off(book[0].sale_off, db)
    book_category = await find_book_catrgory(book[0].category_id, db)
    book_publishing_company = await find_publishing_company(book[0].publishing_company_id, db)
    return {'Book': book[0], 'Author': book_author, 'Translator': book_translator, 'Category': book_category, 'Publishing_company': book_publishing_company, 'Sale_off': book_sale_off}

@router.get("/get_book_by_name/{book_name}", summary="Get books by name")
async def get_books_by_name_endpoint(book_name: str, db: AsyncSession = Depends(get_db)):
    name = generate_all_variations(book_name)
    books = await book_service.get_by_condition([{},{'book_name':name}], db, 0)
    if not books:
        raise HTTPException(status_code=404, detail="No books found with that name")
    book_data = []
    for book in books:
        sale_off = await find_book_sale_off(book.sale_off, db)
        book_data.append({
            'Book_name': book.book_name,
            'Price': book.price,
            'Book_description': book.description,
            'Book_ava': book.book_ava,
            'Sale_off': sale_off
        })
    return book_data

@router.get("/get_book_overview/{book_id}", summary="Get book overview by ID")
async def get_book_overview(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.get_by_condition([{'id':book_id}], db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    sale_off = await find_book_sale_off(book[0].sale_off, db)
    return {
        'Book_name': book[0].book_name,
        'Price': book[0].price,
        'Book_description': book[0].description,
        'Book_ava': book[0].book_ava,
        'Sale_off': sale_off
    }

@router.put("/update_book/{book_id}", summary="Update a book by ID")
async def update_book_endpoint(book_id: UUID, book_update: BookUpdate, db: AsyncSession = Depends(get_db)):
    book = await book_service.update({'id':book_id}, book_update, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.delete("/delete_book/{book_id}", summary="Delete a book by ID")
async def delete_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_name = await book_service.get_by_condition([{'id':book_id}], db)
    book_name = book_name[0].book_name
    print(book_name)    
    delete_folder_aws(book_name)
    book = await book_service.delete(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

BOOK_PER_PAGE = 25
ORDER_BY = "created_at"

@router.get("/get_book_per_page/{page_number}", summary="Get books in page number")
async def get_book_per_page_endpoint(page_number: int, db: AsyncSession = Depends(get_db)):
    from_ = (page_number - 1) * BOOK_PER_PAGE
    books = await book_service.get_by_condition([{'id': ''}], db, 0, from_, BOOK_PER_PAGE)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY, True)

@router.get("/get_book_by_conditions",
            description='''Input a string to find book.\n
            EX:
            and_:   book_name=string&price=0
            or_:    isbn=string3&isbn=string4
            equal:  0
            Find book name = "string", have isbn = "string3" or "string4", price = 0
            If your "equal_condition" is 0, it will return value LIKE your condition (string3 LIKE string34)
            To filter price in range x to y, you can fill in and_ this statement: price_from=x&price_to=y
            If just want filter price >= x, fill in and_ this statement: price_from=x
            ''',
            summary="Get books conditions", )
async def get_book_by_condition_endpoint(and_search_params: str = None, or_search_params: str = None, equal_condition: int = 1, db: AsyncSession = Depends(get_db)):
    books = await book_service.get_by_condition([query_string_to_dict(and_search_params), query_string_to_dict(or_search_params)], db, equal_condition)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY)

@router.post("/add_author_to_book", summary="Add author to book")
async def add_author_to_book_endpoint(book_author: Book_Author_Create, db: AsyncSession = Depends(get_db)):
    return await book_author_service.create(book_author, db)

@router.get("/get_book_author/{book_id}", summary="Get book author by book ID")
async def get_book_author_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_author = await book_author_service.get_by_condition([{'book_id':book_id}], db)
    if not book_author:
        raise HTTPException(status_code=404, detail="Book author not found")
    author_id = book_author[0].author_id
    db_objs = await query_in_db_by_id(db, Author, author_id)
    author_data = []
    for db_obj in db_objs:
        author_data.append({"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name})
    return author_data

@router.delete("/delete_book_author/{book_id}", summary="Delete book author by book ID")
async def delete_book_author_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_author = await book_author_service.delete(book_id, db)
    if not book_author:
        raise HTTPException(status_code=404, detail="Book author not found")
    return book_author

@router.post("/add_translator_to_book", summary="Add translator to book")
async def add_translator_to_book_endpoint(book_translator: Book_Translator_Create, db: AsyncSession = Depends(get_db)):
    return await book_translator_service.create(book_translator, db)

@router.get("/get_book_translator/{book_id}", summary="Get book translator by book ID")
async def get_book_translator_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_translator = await book_translator_service.get_by_condition([{'book_id':book_id}], db)
    if not book_translator:
        raise HTTPException(status_code=404, detail="Book translator not found")
    translator_id = book_translator[0].translator_id
    db_objs = await query_in_db_by_id(db, Translator, translator_id)
    translator_data = []
    for db_obj in db_objs:
        translator_data.append({"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name})
    return translator_data

@router.delete("/delete_book_translator/{book_id}", summary="Delete book translator by book ID")
async def delete_book_translator_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_translator = await book_translator_service.delete(book_id, db)
    if not book_translator:
        raise HTTPException(status_code=404, detail="Book translator not found")
    return book_translator

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import FileResponse
from app.services.CRUDService.crud_service import (
    CRUDService,
    query_string_to_dict,
    query_in_db_by_id,
    CreateService,
    ReadService,
    UpdateService,
)
from app.services.BookService.book_service import generate_all_variations

from app.schemas.BookSchemas.book import BookCreate, BookUpdate
from app.schemas.BookSchemas.book_author import (
    Book_Author_Create,
    Book_Author_Update,
)
from app.schemas.BookSchemas.book_translator import (
    Book_Translator_Create,
    Book_Translator_Update,
)
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
import uuid

from app.controllers.BookController.photo_controller import delete_folder_aws  # SERVICE


import pandas as pd
from app.schemas.BookSchemas.author import AuthorCreate, AuthorUpdate
from app.schemas.BookSchemas.translator import (
    TranslatorCreate,
    TranslatorUpdate,
)
from app.schemas.BookSchemas.publishing_company import (
    PublishingCompanyCreate,
    PublishingCompanyUpdate,
)
from app.schemas.BookSchemas.category import CategoryCreate, CategoryUpdate
from openpyxl import load_workbook
from io import BytesIO
from datetime import datetime

router = APIRouter()
book_service = CRUDService[Book, BookCreate, BookUpdate](Book)
book_author_service = CRUDService[BookAuthor, Book_Author_Create, Book_Author_Update](
    BookAuthor
)
book_translator_service = CRUDService[
    BookTranslator, Book_Translator_Create, Book_Translator_Update
](BookTranslator)


def handle_nan(value, default):
    return default if pd.isna(value) else value


def handle_date(value, default=None):
    try:
        return pd.to_datetime(value)
    except (ValueError, TypeError):
        return default


def create_excel_file(df, file_name):
    # Save the DataFrame to an Excel file
    excel_file = file_name
    df.to_excel(excel_file, index=False)

    # Load the workbook to adjust the column widths
    workbook = load_workbook(excel_file)
    sheet = workbook.active

    # Adjust column widths based on the content
    for column in sheet.columns:
        max_length = 0
        column = list(column)
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(str(cell.value))
            except:
                pass
        adjusted_width = max_length + 2  # Add some padding to the width
        sheet.column_dimensions[column[0].column_letter].width = adjusted_width

    # Save the workbook with adjusted column widths
    # workbook.save(excel_file)
    return excel_file


@router.post("/create_author_db", summary="Create author database")
async def create_author_db(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_author_service = CreateService[Author, AuthorCreate](Author)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = ["ID", "Full_name", "Pen_name", "Description"]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each author to the database
    for _, row in excel_data.iterrows():
        new_author = AuthorCreate(
            id=str(handle_nan(row["ID"], "empty_uuid")),
            full_name=str(handle_nan(row["Full_name"], "")),
            pen_name=str(handle_nan(row["Pen_name"], "")),
            description=str(handle_nan(row.get("Description"), "")),
        )
        if new_author.id == "empty_uuid":
            await create_author_service.create(new_author, db)
        else:
            await create_author_service.create(new_author, db, 0)
    return {"message": "Authors successfully added to the database"}


@router.post("/create_translator_db", summary="Create translator database")
async def create_translator_db(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_translator_service = CreateService[Translator, TranslatorCreate](Translator)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = ["ID", "Full_name", "Pen_name"]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each translator to the database
    for _, row in excel_data.iterrows():
        new_translator = TranslatorCreate(
            id=str(handle_nan(row["ID"], "empty_uuid")),
            full_name=str(handle_nan(row["Full_name"], "")),
            pen_name=str(handle_nan(row["Pen_name"], "")),
        )
        if new_translator.id == "empty_uuid":
            await create_translator_service.create(new_translator, db)
        else:
            await create_translator_service.create(new_translator, db, 0)
    return {"message": "Translators successfully added to the database"}


@router.post(
    "/create_publishing_company_db", summary="Create publishing company database"
)
async def create_publishing_company_db(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_publishing_company_service = CreateService[
        PublishingCompany, PublishingCompanyCreate
    ](PublishingCompany)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = ["ID", "Publishing_company_name"]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each publishing company to the database
    for _, row in excel_data.iterrows():
        new_publishing_company = PublishingCompanyCreate(
            id=str(handle_nan(row["ID"], "empty_uuid")),
            publishing_company_name=str(handle_nan(row["Publishing_company_name"], "")),
        )
        if new_publishing_company.id == "empty_uuid":
            await create_publishing_company_service.create(new_publishing_company, db)
        else:
            await create_publishing_company_service.create(
                new_publishing_company, db, 0
            )
    return {"message": "Publishing companies successfully added to the database"}


@router.post("/create_category_db", summary="Create category database")
async def create_category_db(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_category_service = CreateService[Category, CategoryCreate](Category)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = ["ID", "Category_name", "Description"]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each category to the database
    for _, row in excel_data.iterrows():
        new_category = CategoryCreate(
            id=str(handle_nan(row["ID"], "empty_uuid")),
            category_name=str(handle_nan(row["Category_name"], "")),
            description=str(handle_nan(row.get("Description"), "")),
        )
        if new_category.id == "empty_uuid":
            await create_category_service.create(new_category, db)
        else:
            await create_category_service.create(new_category, db, 0)
    return {"message": "Categories successfully added to the database"}


# @router.post("/add_author_to_book", summary="Add author to book")
# async def add_author_to_book(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
#     create_book_author_service = CreateService[BookAuthor, Book_Author_Create](BookAuthor)
#     # Check if the file type is supported
#     if file.content_type not in [
#         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
#         'application/vnd.ms-excel'
#     ]:
#         raise HTTPException(status_code=400, detail="Invalid file format. Please upload an Excel file.")

#     # Read the Excel file content
#     contents = await file.read()
#     excel_data = pd.read_excel(BytesIO(contents))

#     # Expected columns in the Excel file
#     required_columns = ['Book_id', 'Author_id']

#     # Check if the required columns are present
#     if not all(column in excel_data.columns for column in required_columns):
#         raise HTTPException(status_code=400, detail="Excel file is missing required columns.")

#     # Iterate over the rows in the DataFrame and add each author to the book
#     for _, row in excel_data.iterrows():
#         new_book_author = Book_Author_Create(
#             book_id = str(handle_nan(row['Book_id'], 'empty_uuid')),
#             author_id = str(handle_nan(row['Author_id'], 'empty_uuid'))
#         )
#         if new_book_author.book_id == 'empty_uuid' or new_book_author.author_id == 'empty_uuid':
#             raise HTTPException(status_code=400, detail="Book ID or Author ID is missing")
#         await create_book_author_service.create(new_book_author, db)
#     return {"message": "Authors successfully added to the books"}

# @router.post("/add_translator_to_book", summary="Add translator to book")
# async def add_translator_to_book(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
#     create_book_translator_service = CreateService[BookTranslator, Book_Translator_Create](BookTranslator)
#     # Check if the file type is supported
#     if file.content_type not in [
#         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
#         'application/vnd.ms-excel'
#     ]:
#         raise HTTPException(status_code=400, detail="Invalid file format. Please upload an Excel file.")

#     # Read the Excel file content
#     contents = await file.read()
#     excel_data = pd.read_excel(BytesIO(contents))

#     # Expected columns in the Excel file
#     required_columns = ['Book_id', 'Translator_id']

#     # Check if the required columns are present
#     if not all(column in excel_data.columns for column in required_columns):
#         raise HTTPException(status_code=400, detail="Excel file is missing required columns.")

#     # Iterate over the rows in the DataFrame and add each translator to the book
#     for _, row in excel_data.iterrows():
#         new_book_translator = Book_Translator_Create(
#             book_id = str(handle_nan(row['Book_id'], 'empty_uuid')),
#             translator_id = str(handle_nan(row['Translator_id'], 'empty_uuid'))
#         )
#         if new_book_translator.book_id == 'empty_uuid' or new_book_translator.translator_id == 'empty_uuid':
#             raise HTTPException(status_code=400, detail="Book ID or Translator ID is missing")
#         await create_book_translator_service.create(new_book_translator, db)
#     return {"message": "Translators successfully added to the books"}


@router.post("/create_book_db", summary="Create book database")
async def create_book_db(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_book_service = CreateService[Book, BookCreate](Book)
    update_book_service = UpdateService[Book, BookUpdate](Book)
    read_category_service = ReadService[Category](Category)
    read_publishing_company_service = ReadService[PublishingCompany](PublishingCompany)
    read_sale_off_service = ReadService[SaleOff](SaleOff)
    read_author_service = ReadService[Author](Author)
    read_transalator_service = ReadService[Translator](Translator)
    create_book_author_service = CreateService[BookAuthor, Book_Author_Create](
        BookAuthor
    )
    # update_book_author_service = UpdateService[BookAuthor, Book_Author_Update](BookAuthor)
    create_book_translator_service = CreateService[
        BookTranslator, Book_Translator_Create
    ](BookTranslator)
    # update_book_translator_service = UpdateService[BookTranslator, Book_Translator_Update](BookTranslator)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = [
        "ID",
        "Book_name",
        "isbn",
        "Price",
        "Book_description",
        "Book_ava",
        "Language",
        "Book_size",
        "Page_number",
        "Book_cover_type",
        "Category",
        "Publishing_company",
        "Sale_off_name",
        "Publish_date",
        "Authors",
        "Translators",
    ]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each book to the database
    for _, row in excel_data.iterrows():
        category_id = await read_category_service.get_by_condition(
            [{"category_name": handle_nan(row["Category"], "")}], db
        )
        publishing_company_id = await read_publishing_company_service.get_by_condition(
            [{"publishing_company_name": handle_nan(row["Publishing_company"], "")}], db
        )
        sale_off_id = await read_sale_off_service.get_by_condition(
            [{"sale_off_name": handle_nan(row["Sale_off_name"], "")}], db
        )

        if category_id:
            category_id = category_id[0].id
        else:
            category_id = "empty_uuid"

        if publishing_company_id:
            publishing_company_id = publishing_company_id[0].id
        else:
            publishing_company_id = "empty_uuid"

        if sale_off_id:
            sale_off_id = sale_off_id[0].id
        else:
            sale_off_id = "empty_uuid"

        new_book = BookCreate(
            id=str(handle_nan(row["ID"], "empty_uuid")),
            book_name=str(handle_nan(row["Book_name"], "")),
            isbn=str(handle_nan(row["isbn"], "")),
            price=int(handle_nan(row["Price"], -1)),
            description=str(handle_nan(row.get("Book_description"), "")),
            book_ava=str(handle_nan(row.get("Book_ava"), "")),
            language=str(handle_nan(row["Language"], "")),
            book_size=str(handle_nan(row["Book_size"], "")),
            page_number=int(handle_nan(row["Page_number"], -1)),
            book_cover_type=str(handle_nan(row["Book_cover_type"], "")),
            category_id=str(category_id),
            publishing_company_id=str(publishing_company_id),
            sale_off=str(sale_off_id),
            publishing_date=handle_date(
                row.get("Publish_date"), None
            ),  # Example datetime field
        )
        book_id = new_book.id
        if new_book.id == "empty_uuid":
            await create_book_service.create(new_book, db)
        else:
            try:
                await create_book_service.create(new_book, db, 0)
            except:
                await update_book_service.update({"id": book_id}, new_book, db)
        # Add authors to the book
        authors = handle_nan(row["Authors"], "").split(",")
        for author in authors:
            author_id = await read_author_service.get_by_condition(
                [{}, {"full_name": author, "pen_name": author}], db
            )
            if author_id:
                book_author = Book_Author_Create(
                    book_id=book_id, author_id=str(author_id[0].id)
                )
                try:
                    await create_book_author_service.create(book_author, db)
                except:
                    pass
        # Add translators to the book
        translators = handle_nan(row["Translators"], "").split(",")
        for translator in translators:
            translator_id = await read_transalator_service.get_by_condition(
                [{}, {"full_name": translator, "pen_name": translator}], db
            )
            if translator_id:
                book_translator = Book_Translator_Create(
                    book_id=book_id, translator_id=str(translator_id[0].id)
                )
                try:
                    await create_book_translator_service.create(book_translator, db)
                except:
                    pass

    return {"message": "Books successfully added to the database"}


@router.get("/get_book_excel_file", summary="Download book excel file")
async def get_book_excel_file(db: AsyncSession = Depends(get_db)):
    books = await book_service.get_by_condition([{"id": ""}], db, 0)
    read_category_service = ReadService[Category](Category)
    read_publishing_company_service = ReadService[PublishingCompany](PublishingCompany)
    read_sale_off_service = ReadService[SaleOff](SaleOff)
    read_book_author_service = ReadService[BookAuthor](BookAuthor)
    read_book_translator_service = ReadService[BookTranslator](BookTranslator)
    read_author_service = ReadService[Author](Author)
    read_translator_service = ReadService[Translator](Translator)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    book_data = []
    for book in books:
        category_name = await read_category_service.get_by_condition(
            [{"id": book.category_id}], db
        )
        publishing_company_name = (
            await read_publishing_company_service.get_by_condition(
                [{"id": book.publishing_company_id}], db
            )
        )
        Sale_off_name = await read_sale_off_service.get_by_condition(
            [{"id": book.sale_off}], db
        )

        if publishing_company_name:
            publishing_company_name = publishing_company_name[0].publishing_company_name
        else:
            publishing_company_name = ""
        if category_name:
            category_name = category_name[0].category_name
        else:
            category_name = ""
        if Sale_off_name:
            Sale_off_name = Sale_off_name[0].sale_off_name
        else:
            Sale_off_name = ""

        author_ids = await read_book_author_service.get_by_condition(
            [{"book_id": book.id}], db
        )
        author_names = []
        for author_id in author_ids:
            author_name = await read_author_service.get_by_condition(
                [{"id": author_id.author_id}], db
            )
            if author_name:
                author_names.append(author_name[0].full_name)
        author_names = ", ".join(author_names)

        translator_ids = await read_book_translator_service.get_by_condition(
            [{"book_id": book.id}], db
        )
        translator_names = []
        for translator_id in translator_ids:
            translator_name = await read_translator_service.get_by_condition(
                [{"id": translator_id.translator_id}], db
            )
            if translator_name:
                translator_names.append(translator_name[0].full_name)
        translator_names = ", ".join(translator_names)

        book_data.append(
            {
                "ID": book.id,
                "Book_name": book.book_name,
                "isbn": book.isbn,
                "Publish_date": book.publishing_date,
                "Price": book.price,
                "Book_description": book.description,
                "Book_ava": book.book_ava,
                "Language": book.language,
                "Book_size": book.book_size,
                "Page_number": book.page_number,
                "Book_cover_type": book.book_cover_type,
                "Category": category_name,
                "Publishing_company": publishing_company_name,
                "Sale_off_name": Sale_off_name,
                "Authors": author_names,
                "Translators": translator_names,
            }
        )
        # Convert the list of dictionaries to a DataFrame
    df = pd.DataFrame(book_data)

    # Save the DataFrame to an Excel file
    excel_file = "books.xlsx"

    excel_file = create_excel_file(df, excel_file)
    # Return the Excel file as a response
    return FileResponse(
        excel_file,
        filename="books.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@router.get("/get_author_excel_file", summary="Download author excel file")
async def get_author_excel_file(db: AsyncSession = Depends(get_db)):
    read_author_service = ReadService[Author](Author)
    authors = await read_author_service.get_by_condition([{"id": ""}], db, 0)
    if not authors:
        raise HTTPException(status_code=404, detail="No authors found")
    author_data = []
    for author in authors:
        author_data.append(
            {
                "ID": author.id,
                "Full_name": author.full_name,
                "Pen_name": author.pen_name,
                "Description": author.description,
            }
        )
    df = pd.DataFrame(author_data)
    excel_file = "authors.xlsx"
    excel_file = create_excel_file(df, excel_file)
    return FileResponse(
        excel_file,
        filename="authors.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@router.get("/get_translator_excel_file", summary="Download translator excel file")
async def get_translator_excel_file(db: AsyncSession = Depends(get_db)):
    read_translator_service = ReadService[Translator](Translator)
    translators = await read_translator_service.get_by_condition([{"id": ""}], db, 0)
    if not translators:
        raise HTTPException(status_code=404, detail="No translators found")
    translator_data = []
    for translator in translators:
        translator_data.append(
            {
                "ID": translator.id,
                "Full_name": translator.full_name,
                "Pen_name": translator.pen_name,
            }
        )
    df = pd.DataFrame(translator_data)
    excel_file = "translators.xlsx"
    excel_file = create_excel_file(df, excel_file)
    return FileResponse(
        excel_file,
        filename="translators.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@router.get(
    "/get_publishing_company_excel_file",
    summary="Download publishing company excel file",
)
async def get_publishing_company_excel_file(db: AsyncSession = Depends(get_db)):
    read_publishing_company_service = ReadService[PublishingCompany](PublishingCompany)
    publishing_companies = await read_publishing_company_service.get_by_condition(
        [{"id": ""}], db, 0
    )
    if not publishing_companies:
        raise HTTPException(status_code=404, detail="No publishing companies found")
    publishing_company_data = []
    for publishing_company in publishing_companies:
        publishing_company_data.append(
            {
                "ID": publishing_company.id,
                "Publishing_company_name": publishing_company.publishing_company_name,
            }
        )
    df = pd.DataFrame(publishing_company_data)
    excel_file = "publishing_companies.xlsx"
    excel_file = create_excel_file(df, excel_file)
    return FileResponse(
        excel_file,
        filename="publishing_companies.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@router.get("/get_category_excel_file", summary="Download category excel file")
async def get_category_excel_file(db: AsyncSession = Depends(get_db)):
    read_category_service = ReadService[Category](Category)
    categories = await read_category_service.get_by_condition([{"id": ""}], db, 0)
    if not categories:
        raise HTTPException(status_code=404, detail="No categories found")
    category_data = []
    for category in categories:
        category_data.append(
            {
                "ID": category.id,
                "Category_name": category.category_name,
                "Description": category.description,
            }
        )
    df = pd.DataFrame(category_data)
    excel_file = "categories.xlsx"
    excel_file = create_excel_file(df, excel_file)
    return FileResponse(
        excel_file,
        filename="categories.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


# @router.get("/get_book_author_excel_file", summary="Download book author excel file")
# async def get_book_author_excel_file(db: AsyncSession = Depends(get_db)):
#     read_book_author_service = ReadService[BookAuthor](BookAuthor)
#     book_authors = await read_book_author_service.get_by_condition([{'id': ''}], db, 0)
#     if not book_authors:
#         raise HTTPException(status_code=404, detail="No book authors found")
#     book_author_data = []
#     for book_author in book_authors:
#         book_author_data.append({
#             'ID': book_author.id,
#             'Book_id': book_author.book_id,
#             'Author_id': book_author.author_id
#         })
#     df = pd.DataFrame(book_author_data)
#     excel_file = "book_authors.xlsx"
#     excel_file = create_excel_file(df, excel_file)
#     return FileResponse(excel_file, filename="book_authors.xlsx", media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

# @router.get("/get_book_translator_excel_file", summary="Download book translator excel file")
# async def get_book_translator_excel_file(db: AsyncSession = Depends(get_db)):
#     read_book_translator_service = ReadService[BookTranslator](BookTranslator)
#     book_translators = await read_book_translator_service.get_by_condition([{'id': ''}], db, 0)
#     if not book_translators:
#         raise HTTPException(status_code=404, detail="No book translators found")
#     book_translators_data = []
#     for book_translator in book_translators:
#         book_translators_data.append({
#             'ID': book_translator.id,
#             'Book_id': book_translator.book_id,
#             'Translator_id': book_translator.translator_id
#         })
#     df = pd.DataFrame(book_translators_data)
#     excel_file = "book_translators.xlsx"
#     excel_file = create_excel_file(df, excel_file)
#     return FileResponse(excel_file, filename="book_translators.xlsx", media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")


async def find_book_author(book_id: str, db: AsyncSession):
    book_author = await book_author_service.get_by_condition([{"book_id": book_id}], db)
    if not book_author:
        return "Can not find author of this book"
    else:
        author_data = []
        unique_list = []
        for author in book_author:
            author_id = author.author_id
            db_objs = await query_in_db_by_id(db, Author, author_id)
            if db_objs:
                if db_objs[0].full_name not in unique_list:
                    unique_list.append(db_objs[0].full_name)
                    author_data.append(
                        {
                            "Full_name": db_objs[0].full_name,
                            "Pen_name": db_objs[0].pen_name,
                        }
                    )
    return author_data


async def find_book_translator(book_id: str, db: AsyncSession):
    book_translator = await book_translator_service.get_by_condition(
        [{"book_id": book_id}], db
    )
    if not book_translator:
        return "Can not find translator of this book"
    else:
        translator_data = []
        unique_list = []
        for translator in book_translator:
            translator_id = translator.translator_id
            db_objs = await query_in_db_by_id(db, Translator, translator_id)
            if db_objs:
                if db_objs[0].full_name not in unique_list:
                    unique_list.append(db_objs[0].full_name)
                    translator_data.append(
                        {
                            "Full_name": db_objs[0].full_name,
                            "Pen_name": db_objs[0].pen_name,
                        }
                    )
    return translator_data


async def find_book_catrgory(category_id: str, db: AsyncSession):
    category = await query_in_db_by_id(db, Category, category_id)
    if not category:
        return "Can not find category of this book"
    else:
        category = category[0].category_name
    return category


async def find_publishing_company(publishing_company_id: str, db: AsyncSession):
    publishing_company = await query_in_db_by_id(
        db, PublishingCompany, publishing_company_id
    )
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
async def create_book_endpoint(book: BookCreate,  category_name: str = None, publisher_name: str = None, author_name: str = None, translator_name: str = None, db: AsyncSession = Depends(get_db)):
    if book.id == "empty_uuid":
        book.id = str(uuid.uuid4())
    id_ = book.id
    if category_name:
        read_category_service = ReadService[Category](Category)
        category = await read_category_service.get_by_condition([{}, {"category_name": category_name}], db)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        book.category_id = category[0].id
        
    if publisher_name:
        read_publishing_company_service = ReadService[PublishingCompany](PublishingCompany)
        publisher = await read_publishing_company_service.get_by_condition([{}, {"publishing_company_name": publisher_name}], db)
        if not publisher:
            raise HTTPException(status_code=404, detail="Publisher not found")
        book.publishing_company_id = publisher[0].id
    author_id = None
    translator_id = None
    
    if author_name:
        read_author_service = ReadService[Author](Author)
        author = await read_author_service.get_by_condition([{}, {"full_name": author_name}], db)
        if not author:
            raise HTTPException(status_code=404, detail="Author not found")
        author_id = author[0].id
        
    if translator_name:
        read_translator_service = ReadService[Translator](Translator)
        translator = await read_translator_service.get_by_condition([{}, {"full_name": translator_name}], db)
        if not translator:
            raise HTTPException(status_code=404, detail="Translator not found")
        translator_id = translator[0].id
    await book_service.create(book, db, 0)
    
    if author_id:
        create_book_author_service = CreateService[BookAuthor, Book_Author_Create](BookAuthor)
        book_author = Book_Author_Create(book_id=str(id_), author_id=str(author_id))
        await create_book_author_service.create(book_author, db)
    if translator_id:
        create_book_translator_service = CreateService[BookTranslator, Book_Translator_Create](BookTranslator)
        book_translator = Book_Translator_Create(book_id=str(id_), translator_id=str(translator_id))
        await create_book_translator_service.create(book_translator, db)

    return id_

@router.get("/get_book/{book_id}", summary="Get a book by ID")
async def get_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.get_by_condition([{"id": book_id}], db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book_translator = await find_book_translator(book_id, db)
    book_author = await find_book_author(book_id, db)
    book_sale_off = await find_book_sale_off(book[0].sale_off, db)
    book_category = await find_book_catrgory(book[0].category_id, db)
    book_publishing_company = await find_publishing_company(
        book[0].publishing_company_id, db
    )
    return {
        "Book": book[0],
        "Author": book_author,
        "Translator": book_translator,
        "Category": book_category,
        "Publishing_company": book_publishing_company,
        "Sale_off": book_sale_off,
    }


@router.get("/get_book_by_name/{book_name}", summary="Get books by name")
async def get_books_by_name_endpoint(
    book_name: str, db: AsyncSession = Depends(get_db)
):
    name = generate_all_variations(book_name)
    books = await book_service.get_by_condition([{}, {"book_name": name}], db, 0, 0, 5)
    if not books:
        raise HTTPException(status_code=404, detail="No books found with that name")
    book_data = []
    for book in books:
        sale_off = await find_book_sale_off(book.sale_off, db)
        book_data.append(
            {
                "Book_name": book.book_name,
                "Price": book.price,
                "Book_description": book.description,
                "Book_ava": book.book_ava,
                "Sale_off": sale_off,
            }
        )
    return book_data


@router.get("/get_book_overview/{book_id}", summary="Get book overview by ID")
async def get_book_overview(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.get_by_condition([{"id": book_id}], db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    sale_off = await find_book_sale_off(book[0].sale_off, db)
    return {
        "Book_name": book[0].book_name,
        "Price": book[0].price,
        "Book_description": book[0].description,
        "Book_ava": book[0].book_ava,
        "Sale_off": sale_off,
    }


@router.put("/update_book/{book_id}", summary="Update a book by ID")
async def update_book_endpoint(id_: str, book_update: BookUpdate,  category_name: str = None, publisher_name: str = None, author_name: str = None, translator_name: str = None, db: AsyncSession = Depends(get_db)):
    book_id = id_
    if category_name:
        read_category_service = ReadService[Category](Category)
        category = await read_category_service.get_by_condition([{}, {"category_name": category_name}], db)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        book_update.category_id = category[0].id
    if publisher_name:
        read_publishing_company_service = ReadService[PublishingCompany](PublishingCompany)
        publisher = await read_publishing_company_service.get_by_condition([{}, {"publishing_company_name": publisher_name}], db)
        if not publisher:
            raise HTTPException(status_code=404, detail="Publisher not found")
        book_update.publishing_company_id = publisher[0].id
    author_id = None
    translator_id = None
    if author_name:
        read_author_service = ReadService[Author](Author)
        author = await read_author_service.get_by_condition([{}, {"full_name": author_name}], db)
        if not author:
            raise HTTPException(status_code=404, detail="Author not found")
        author_id = author[0].id
    if translator_name:
        read_translator_service = ReadService[Translator](Translator)
        translator = await read_translator_service.get_by_condition([{}, {"full_name": translator_name}], db)
        if not translator:
            raise HTTPException(status_code=404, detail="Translator not found")
        translator_id = translator[0].id
    if author_id:
        book_author = await find_book_author(book_id, db)
        if book_author == "Can not find author of this book":
            create_book_author = CreateService[BookAuthor, Book_Author_Create](BookAuthor)
            book_author_create = Book_Author_Create()
            book_author_create.author_id = author_id
            book_author_create.book_id = book_id
            await create_book_author.create(book_author_create, db)
        else:
            update_book_author = UpdateService[BookAuthor, Book_Author_Update](BookAuthor)
            book_author_update = Book_Author_Update()
            book_author_update.author_id = author_id
            book_author_update.book_id = book_id
            await update_book_author.update({"book_id": book_id}, book_author_update, db)
    if translator_id:
        book_translator = await find_book_translator(book_id, db)
        if book_translator == "Can not find translator of this book":
            create_book_translator = CreateService[BookTranslator, Book_Translator_Create](BookTranslator)
            book_translator_create = Book_Translator_Create()
            book_translator_create.translator_id = translator_id
            book_translator_create.book_id = book_id
            await create_book_translator.create(book_translator_create, db)
        else:
            update_book_translator = UpdateService[BookTranslator, Book_Translator_Update](BookTranslator)
            book_translator_update = Book_Translator_Update()
            book_translator_update.translator_id = translator_id
            book_translator_update.book_id = book_id
            await update_book_translator.update({"book_id": book_id}, book_translator_update, db)
    book = await book_service.update({"id": book_id}, book_update, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book_id


@router.delete("/delete_book/{book_id}", summary="Delete a book by ID")
async def delete_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_name = await book_service.get_by_condition([{"id": book_id}], db)
    book_name = book_name[0].book_name
    # print(book_name)
    delete_folder_aws(book_name)
    book = await book_service.delete(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


BOOK_PER_PAGE = 25
ORDER_BY = "created_at"


@router.get("/get_book_per_page/{page_number}", summary="Get books in page number")
async def get_book_per_page_endpoint(
    page_number: int, db: AsyncSession = Depends(get_db)
):
    from_ = (page_number - 1) * BOOK_PER_PAGE
    books = await book_service.get_by_condition(
        [{"id": ""}], db, 0, from_, BOOK_PER_PAGE
    )
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY, True)


@router.get(
    "/get_book_by_conditions",
    description="""Input a string to find book.\n
            EX:
            and_:   book_name=string&price=0
            or_:    isbn=string3&isbn=string4
            equal:  0
            Find book name = "string", have isbn = "string3" or "string4", price = 0
            If your "equal_condition" is 0, it will return value LIKE your condition (string3 LIKE string34)
            To filter price in range x to y, you can fill in and_ this statement: price_from=x&price_to=y
            If just want filter price >= x, fill in and_ this statement: price_from=x
            """,
    summary="Get books conditions",
)
async def get_book_by_condition_endpoint(
    and_search_params: str = None,
    or_search_params: str = None,
    equal_condition: int = 1,
    db: AsyncSession = Depends(get_db),
):
    books = await book_service.get_by_condition(
        [
            query_string_to_dict(and_search_params),
            query_string_to_dict(or_search_params),
        ],
        db,
        equal_condition,
    )
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY)


@router.post("/add_author_to_book", summary="Add author to book")
async def add_author_to_book_endpoint(
    book_author: Book_Author_Create, db: AsyncSession = Depends(get_db)
):
    return await book_author_service.create(book_author, db)


@router.get("/get_book_author/{book_id}", summary="Get book author by book ID")
async def get_book_author_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book_author = await book_author_service.get_by_condition([{"book_id": book_id}], db)
    if not book_author:
        raise HTTPException(status_code=404, detail="Book author not found")
    author_id = book_author[0].author_id
    db_objs = await query_in_db_by_id(db, Author, author_id)
    author_data = []
    for db_obj in db_objs:
        author_data.append({"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name})
    return author_data


@router.delete("/delete_book_author/{book_id}", summary="Delete book author by book ID")
async def delete_book_author_endpoint(
    book_id: UUID, db: AsyncSession = Depends(get_db)
):
    book_author = await book_author_service.delete(book_id, db)
    if not book_author:
        raise HTTPException(status_code=404, detail="Book author not found")
    return book_author


@router.post("/add_translator_to_book", summary="Add translator to book")
async def add_translator_to_book_endpoint(
    book_translator: Book_Translator_Create, db: AsyncSession = Depends(get_db)
):
    return await book_translator_service.create(book_translator, db)


@router.get("/get_book_translator/{book_id}", summary="Get book translator by book ID")
async def get_book_translator_endpoint(
    book_id: UUID, db: AsyncSession = Depends(get_db)
):
    book_translator = await book_translator_service.get_by_condition(
        [{"book_id": book_id}], db
    )
    if not book_translator:
        raise HTTPException(status_code=404, detail="Book translator not found")
    translator_id = book_translator[0].translator_id
    db_objs = await query_in_db_by_id(db, Translator, translator_id)
    translator_data = []
    for db_obj in db_objs:
        translator_data.append(
            {"Full_name": db_obj.full_name, "Pen_name": db_obj.pen_name}
        )
    return translator_data


@router.delete(
    "/delete_book_translator/{book_id}", summary="Delete book translator by book ID"
)
async def delete_book_translator_endpoint(
    book_id: UUID, db: AsyncSession = Depends(get_db)
):
    book_translator = await book_translator_service.delete(book_id, db)
    if not book_translator:
        raise HTTPException(status_code=404, detail="Book translator not found")
    return book_translator

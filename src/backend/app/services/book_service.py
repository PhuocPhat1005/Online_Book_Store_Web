# from sqlalchemy.future import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.models.book import Book
# from app.schemas.book import BookCreate, BookUpdate, BookResponse, BookOrder
# from fastapi import Depends, HTTPException
# from app.config.config import settings
# from app.database.database import get_db
# from sqlalchemy import func, asc, desc
# from sqlalchemy import Column
# from typing import Any
from itertools import product

# Danh sách các ký tự có dấu và không có dấu
diacritics_map = {
    'a': ['a', 'á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
    'e': ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'],
    'i': ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị'],
    'o': ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ'],
    'u': ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'],
    'y': ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'],
    'd': ['d', 'đ']
}

def capitalize_words(text):
    """Viết hoa chữ cái đầu tiên của mỗi từ"""
    return ' '.join(word.capitalize() for word in text.split())

def generate_all_variations(text):
    # Tạo danh sách các ký tự thay thế cho từng ký tự trong chuỗi
    text = text.lower()
    char_options = []
    for char in text:
        if char in diacritics_map:
            char_options.append(diacritics_map[char])
        else:
            char_options.append([char])
    
    # Tạo tất cả các biến thể bằng cách kết hợp các tùy chọn
    all_variations = [''.join(variation) for variation in product(*char_options)]
    
    # Xử lý biến thể
    processed_variations = []
    for variant in all_variations:
        # Loại bỏ các khoảng trắng ở đầu chuỗi
        variant = variant.lstrip()
        
        processed_variations.append(variant)
        
        # Viết hoa chữ cái đầu tiên của mỗi từ
        variant = capitalize_words(variant)
        
        # Thêm biến thể vào danh sách
        processed_variations.append(variant)
    
    return processed_variations
from database.db_conn import SessionLocal
from database.schema import create_tables

def init_db():
    create_tables()

if __name__ == "__main__":
    init_db()
    db = SessionLocal()
    # Thêm logic khởi tạo hoặc sử dụng database tại đây
    db.close()

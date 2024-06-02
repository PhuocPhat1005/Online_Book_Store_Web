from database.models import *
from database.engine import Base
from database.db_conn import SessionLocal, engine


if __name__ == "__main__":
    Base.metadata.drop_all(engine)
    print("All tables have been dropped.")
    db = SessionLocal()
    # Thêm logic khởi tạo hoặc sử dụng database tại đây
    db.close()

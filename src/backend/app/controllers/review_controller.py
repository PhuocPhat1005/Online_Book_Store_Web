from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, get_user_obj_by_token
from app.schemas.review import ReviewCreate, ReviewUpdate
from app.models.review import Review
from app.database.database import get_db
from uuid import UUID

router = APIRouter()

review_service = CRUDService[Review, ReviewCreate, ReviewUpdate](Review)

@router.post("/create_review", summary="Create a new review")
async def create_review(access_token: str, review: ReviewCreate, db: AsyncSession = Depends(get_db)):
    user_obj = await get_user_obj_by_token(access_token, db)
    review.user_id = user_obj.id
    return await review_service.create(review, db)

@router.get("/get_review/{review_id}", summary="Get a review by ID")
async def get_review(review_id: UUID, db: AsyncSession = Depends(get_db)):
    review = await review_service.get_by_condition([{'id': review_id}], db)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.get("/get_reviews_by_book/{book_id}", summary="Get reviews by book ID")
async def get_reviews_by_book(book_id: UUID, db: AsyncSession = Depends(get_db)):
    reviews = await review_service.get_by_condition([{'book_id': book_id}], db)
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found for that book")
    return reviews

@router.get("/get_reviews_by_access_token", summary="Get reviews by user access token")
async def get_reviews_by_access_token(access_token: str, db: AsyncSession = Depends(get_db)):
    user_obj = await get_user_obj_by_token(access_token, db)
    reviews = await review_service.get_by_condition([{'user_id': user_obj.id}], db)
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found for that user")
    return reviews

@router.put("/update_reviews", summary="Update a review")
async def update_review(review_id: UUID, review: ReviewUpdate, db: AsyncSession = Depends(get_db)):
    return await review_service.update({'id': review_id}, review, db)

@router.delete("/delete_review", summary="Delete a review")
async def delete_review(review_id: UUID, db: AsyncSession = Depends(get_db)):
    return await review_service.delete({'id': review_id}, db)
from fastapi import APIRouter
from app.services.PaymentService.payment_service import (
    createPaymentLink,
    getPaymentLinkInformation,
)

router = APIRouter()


@router.post("/create_payment_link")
async def create_payment_link(orderId: str):
    payment_link = createPaymentLink(orderId)
    return payment_link.checkoutUrl


@router.get("/get_payment_link_information")
async def get_payment_link_information(orderId: str):
    payment_link_info = getPaymentLinkInformation(orderId)
    return payment_link_info

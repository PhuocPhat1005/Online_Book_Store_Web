from app.config.config import settings
from payos import PayOS, ItemData, PaymentData

client_id = settings.PAYOS_CLIENT_ID
api_key = settings.PAYOS_API_KEY
checksum_key = settings.PAYOS_CHECKSUM_KEY

payOS = PayOS(client_id=client_id, api_key=api_key, checksum_key=checksum_key)
domain = "http://localhost:8000"

def createPaymentLink(orderId: str, listItems: list, totalAmount: int, shippingCost: int):
    item_data = []
    for item in listItems:
        item_data.append(ItemData(
            name = item[1],
            quantity = item[2],
            price = int(item[3])))
        
    item_data.append(ItemData(
        name = "Shipping cost",
        quantity = 1,
        price = int(shippingCost)))
    
    payment_data = PaymentData(
        orderCode = orderId,
        amount = int(float(totalAmount) + float(shippingCost)),
        items = item_data,
        description="Thanh toan don hang",
        cancelUrl= domain + "/cancel.html",
        returnUrl= domain + "/sucess.html"
    )
    
    paymentLinkData = payOS.createPaymentLink(paymentData = payment_data)
    return paymentLinkData

def getPaymentLinkInformation(orderId: str):
    paymentLinkInfo = payOS.getPaymentLinkInformation(orderId = orderId)
    return paymentLinkInfo

def cancelPaymentLink(orderId: str):
    paymentLinkInfo = payOS.cancelPaymentLink(orderId = orderId)
    return paymentLinkInfo
import webbrowser

BANK_ID = "970418"
ACCOUNT_NO = "7420762423"
TEMPLATE = "compact2"
AMOUNT = "2024"
DESCRIPTION = "Thanh toan 2024 dong"
ACCOUNT_NAME = "SIBOOK"
req_link = "https://img.vietqr.io/image/" + BANK_ID + "-" + ACCOUNT_NO + "-" + TEMPLATE + ".png?amount=" + AMOUNT + "&addInfo=" + DESCRIPTION + "&accountName=" + ACCOUNT_NAME
webbrowser.open(req_link)

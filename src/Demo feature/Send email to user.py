import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email configuration
sender_email = "me@gmail.com"  # Replace with your email
receiver_email = "you@gmail.com"
password = "passwordapp"  # Replace with your email password

# Create the email content
subject = "I love Book"
body = "I love Book"

msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject

msg.attach(MIMEText(body, 'plain'))

# Send the email
try:
    # Connect to the Gmail SMTP server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()  # Secure the connection
    server.login(sender_email, password)
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    server.quit()

    print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")

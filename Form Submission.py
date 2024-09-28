# import smtplib
# from email.mime.text import MIMEText

# app = Flask(__name__)

# @app.route('/form', methods=['POST'])
# def form():
#     name = request.form.get('name')
#     email = request.form.get('email')

#     # Prepare the email
#     msg = MIMEText(f'Name: {name}\nEmail: {email}')
#     msg['Subject'] = 'New form submission'
#     msg['From'] = 'your-email@example.com'
#     msg['To'] = 'your-email@example.com'

#     # Send the email
#     s = smtplib.SMTP('your-smtp-server.com')
#     s.login('your-username', 'your-password')
#     s.send_message(msg)
#     s.quit()

#     return 'Form submitted and email sent!'

# if __name__ == '__main__':
#     app.run(debug=True)
import smtplib

recepient_email = 'niko.gk@icloud.com'
sender_email = 'dimitriosgkiokmema@gmail.com'
subject = 'Test'
message = 'If you are seeing this, I was able to\nsend an email through Python!'
text = f"Subject: {subject}\n\n{message}"
server = smtplib.SMTP("smtp.mail.me.com", 587)
server.starttls()
server.login(sender_email, "dcyo-wtgw-pozf-ctwm")  # DO NOT DELETE THIS PASSWORD
server.sendmail(sender_email, [recepient_email], text)
server.quit()
print('email should have been sent')

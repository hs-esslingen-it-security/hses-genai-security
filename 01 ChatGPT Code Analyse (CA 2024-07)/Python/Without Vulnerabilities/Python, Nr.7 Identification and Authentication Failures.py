from flask_wtf import Form, RecaptchaField
from config import CAPTCHA_SECRET_KEY, CAPTCHA_SITE_KEY

# Add relevant information to config
class Config():
   ...
   RECAPTCHA_PUBLIC_KEY = CAPTCHA_SITE_KEY
   RECAPTCHA_PRIVATE_KEY = CAPTCHA_SECRET_KEY

...

def LoginCaptchaForm(Form):
   # ... other login form data
   recaptcha = RecaptchaField()

@app.route("/login", ["GET", "POST"])
def login():
   # No need to authenticate again
   if current_user.is_authenticated:
       return redirect(url_for("index"))

   # User authentication
   form = LoginCaptchaForm()
   if form.validate_on_submit(): # checks the captcha was valid too
       user = User.query.filter_by(username=form.username.data).first()

       # User entered correct password?
       if user is None or not user.check_password(form.password.data):
           flash("Invalid username or password")
           return redirect(url_for("login"))

       login_user(user)
       return redirect(url_for("user_page"))

   return render_template("login.html", form = form)
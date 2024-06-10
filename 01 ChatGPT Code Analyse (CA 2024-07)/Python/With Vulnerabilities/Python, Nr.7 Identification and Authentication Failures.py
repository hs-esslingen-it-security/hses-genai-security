from flask import Flask, render_template, redirect, url_for, flash
from flask_login import current_user, login_user
from forms import LoginForm
from models import User

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your-secret-key'

def init_db():
    pass

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
   if current_user.is_authenticated:
       return redirect(url_for("index"))

   form = LoginForm()
   if form.validate_on_submit():
       user = User.query.filter_by(username=form.username.data).first()

       if user is None or not user.check_password(form.password.data):
           flash("Invalid username or password")
           return redirect(url_for("login"))

       login_user(user)
       return redirect(url_for("user_page"))

   return render_template("login.html", form=form)

@app.route("/user_page")
def user_page():
    return render_template("user_page.html")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)

WAIT_TIME_PER_LOGIN = 5

@app.route("/login", ["GET", "POST"])
def login():
   # No need to authenticate again
   if current_user.is_authenticated:
       return redirect(url_for("index"))

   # User authentication
   form = LoginForm()
   if form.validate_on_submit():
       user = User.query.filter_by(username=form.username.data).first()

       last_login_atmpt = user.last_login_attempt
       consec_failed_logins = user.no_failed_logins
       user_timeout = user.user_timeout

       time_between = (datetime.datetime.now() - last_login_atmpt).total_seconds()

       user.last_login_attempt = datetime.datetime.now()

       if time_between < user_timeout:
           flash(f"Please wait {user_timeout} seconds before attempting to login again.")

           # Wait 5 extra seconds for each incorrect login
           user.user_timeout = consec_failed_logins * WAIT_TIME_PER_LOGIN
           user.no_failed_logins += 1
           db.session.update(user)
           db.session.commit()
           return redirect(url_for("login"))       
      
       # User entered correct password?
       if user is None or not user.check_password(form.password.data):
           flash("Invalid username or password")
           user.no_failed_logins += 1

           db.session.update(user)
           db.session.commit()
           return redirect(url_for("login"))

       user.no_failed_logins = 0
       user.user_timeout = 0
       db.session.update(user)
       db.session.commit()
       login_user(user)
       return redirect(url_for("user_page"))
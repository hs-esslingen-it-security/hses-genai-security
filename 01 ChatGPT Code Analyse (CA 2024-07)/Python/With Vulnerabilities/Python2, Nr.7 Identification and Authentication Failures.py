class Comment(db.Model):

   msg = TextField()
   posting_user = ForeignKeyField(
       rel_model = User,
       related_name = "Comments"
   )

   receiving_user = ForeignKeyField(
       rel_model = User,
       related_name = "Comments"
   )

   def __init__(self, msg, post_user, recv_user):

       self.msg = msg
       self.posting_user = post_user
       self.receiving_user = recv_user


@app.route("/profile/<int:profile_id>/comments", ["GET", "POST"])
def add_comment(profile_id):

   comment_txt = request.form["comment"]
   user_id = request.form["uid"] # Who's commenting?
   profile_id = profile_id       # Profile page being commented on

   comment = Comment(
       comment_txt,
       user_id,
       profile_id
   )

   db.session.add(comment)
   db.session.commit()

   return redirect(f"/profile/<int:profile_id>")
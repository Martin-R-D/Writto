from django.db import models    
from django.contrib.auth.models import User


class Posts(models.Model): 
    title = models.CharField(max_length=50)
    content = models.TextField()
    likes = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

class PostsLikes(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comments(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

class FriendRequets(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='send_friend_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_friend_requests')

class Friends(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2')

class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
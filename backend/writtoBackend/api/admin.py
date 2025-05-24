from django.contrib import admin
from .models import Posts, PostsLikes, Comments, FriendRequets, Friends, Messages


class CommentsAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'date', 'content')

class MessagesAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'content', 'time')

admin.site.register(Posts)
admin.site.register(PostsLikes)
admin.site.register(Comments, CommentsAdmin)
admin.site.register(FriendRequets)
admin.site.register(Friends)
admin.site.register(Messages, MessagesAdmin)


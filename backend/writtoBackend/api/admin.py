from django.contrib import admin
from .models import Posts, PostsLikes, Comments, FriendRequets


class CommentsAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'date', 'content')

admin.site.register(Posts)
admin.site.register(PostsLikes)
admin.site.register(Comments, CommentsAdmin)
admin.site.register(FriendRequets)


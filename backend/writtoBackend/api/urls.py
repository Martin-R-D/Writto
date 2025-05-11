from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegistrationView, PostsView, GetUserData, LikePost, LikedPostsIds, CommentsView

router = routers.DefaultRouter()
router.register('posts', PostsView, basename='post')
router.register('comments', CommentsView, basename='comment')

urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('', include(router.urls)),
    path('login/', obtain_auth_token),
    path('get-user/', GetUserData.as_view()),
    path('like-post/', LikePost.as_view()),
    path('liked-posts/', LikedPostsIds.as_view()),
]
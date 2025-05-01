from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegistrationView, PostsView

router = routers.DefaultRouter()
router.register('posts', PostsView, basename='post')

urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('', include(router.urls)),
    path('login/', obtain_auth_token),
]
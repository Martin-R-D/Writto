from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegistrationView, LoginView

urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('login/', obtain_auth_token),
]
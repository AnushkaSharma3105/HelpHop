from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing, name="landing"),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('verify-email/', views.verify_email, name='verify_email'),
    path("register-user/", views.register_user, name="register_user"),
]

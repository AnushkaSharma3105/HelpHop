from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing, name="landing"),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('verify-email/', views.verify_email, name='verify_email'),
    path("register-user/", views.register_user, name="register_user"),
    path("contact/", views.contact, name="contact"),
    path("customer-home/", views.customer_home, name="customer_home"),
    path("customer-profile/", views.customer_profile, name="customer_profile"),
    path("customer-settings/", views.customer_settings, name="customer_settings"),
    path("customer-services/", views.customer_services, name="customer_services"),
    path("customer-dashboard/", views.customer_dashboard, name="customer_dashboard"),
    path("logout/", views.logout_view, name="logout"),
]

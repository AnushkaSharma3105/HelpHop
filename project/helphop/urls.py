from django.urls import path
from . import views
from .views import register_view, login_view, verify_view, logout_view

urlpatterns = [
    path("", views.landing, name="landing"),
    path("contact/", views.contact, name="contact"),
    
    # Customer URLs
    path("customer-home/", views.customer_home, name="customer_home"),
    path("customer-profile/", views.customer_profile, name="customer_profile"),
    path("customer-settings/", views.customer_settings, name="customer_settings"),
    path("customer-services/", views.customer_services, name="customer_services"),
    path("customer-dashboard/", views.customer_dashboard, name="customer_dashboard"),
    
    # Worker URLs
    path("worker-home/", views.worker_home, name="worker_home"),
    path("worker-profile/", views.worker_profile, name="worker_profile"),
    path("worker-settings/", views.worker_settings, name="worker_settings"),
    path("worker-dashboard/", views.worker_dashboard, name="worker_dashboard"),
    path("worker-jobs/", views.worker_jobs, name="worker_jobs"),
    path("worker-earnings/", views.worker_earnings, name="worker_earnings"),
    
    # Auth URLs
    path("register/", register_view, name="register"),
    path("verify/", verify_view, name="verify"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    
    # Booking and Services
    path("book-now/", views.book_now, name="book_now"),
    path("schedule/", views.schedule, name="schedule"),
    path("search-service/", views.service_search, name="service_search"),
    path("Payment/", views.payment, name='Payment'),
]
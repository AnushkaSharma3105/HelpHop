HelpHop – Role-Based Home Service Platform

HelpHop is a full-stack Django web application that connects customers with service professionals for home services such as plumbing, electrical work, cleaning, painting, laundry, and repairs.

The platform implements role-based authentication, providing separate dashboards and home pages for customers and workers.

Core Features:-
Role-Based Authentication
Custom user model with role differentiation (Customer / Worker)

After login:

Customers are redirected to Customer Home
Workers are redirected to Worker Dashboard
Protected routes using @login_required
Session-based authentication

Customer Features:-

Search for services
Book services instantly or schedule later
View booking history
Filter bookings by status
Manage profile
Simulated payment system

Worker Features:-

Separate Worker Dashboard
View assigned bookings
Update booking status
Mark service as completed
OTP/email-based verification 

Smart Service Search:-

Keyword-based search system
Backend returns JSON response
JavaScript handles dynamic redirection

Simulated Payment System

UPI, Card, Net Banking, Wallet options
Frontend validation
Dynamic billing calculation

Tech Stack:-
Backend-
Python
Django
Django ORM
SQLite 
Session Authentication

Frontend-

HTML5
CSS3 
JavaScript 

Application Flow-

User registers with role (Customer or Worker).

After login:

Role is checked in backend.
User is redirected to role-specific home page.
Customers can book services.
Booking is stored in database linked via ForeignKey to user.
Workers can view and manage assigned bookings.
Dashboard dynamically updates booking status.

Authentication Logic:-
Uses Django’s authentication system
Passwords are securely hashed
Role-based redirection handled in login view
Worker and Customer dashboards protected using login_required

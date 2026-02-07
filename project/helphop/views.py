from django.conf import settings
from django.shortcuts import render, redirect
from .models import Profile


import random
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.contrib import messages

from .models import User, EmailOTP
from .forms import RegisterForm, LoginForm, OTPForm


def register_view(request):
    print("REGISTER VIEW HIT", request.method)
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.is_active = False
            user.save()

            otp = str(random.randint(100000, 999999))
            EmailOTP.objects.create(user=user, otp=otp)

            send_mail(
                "OTP Verification",
                f"Your OTP is {otp}",
                None,
                [user.email],
            )

            request.session["email"] = user.email
            return redirect("verify")

    else:
        form = RegisterForm()

    return render(request, "helphop/register_user.html", {"form": form})


def verify_view(request):
    email = request.session.get("email")
    if not email:
        return redirect("register")

    user = User.objects.get(email=email)
    otp_obj = EmailOTP.objects.get(user=user)

    if request.method == "POST":
        form = OTPForm(request.POST)

        if form.is_valid():
            entered_otp = form.cleaned_data["otp"]

            if entered_otp == otp_obj.otp:
                user.is_active = True
                user.save()
                otp_obj.delete()

                send_mail(
                    subject="Your Account Has Been Verified 🎉",
                    message=f"Hello {user.email},\n\n"
                            "Your HelpHop account has been successfully verified.\n"
                            "You can now log in and start using our platform.\n\n"
                            "Thank you for joining us!",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[user.email],
                    fail_silently=False,
                )

                messages.success(request, "Account verified successfully")
                return redirect("login")

            else:
                messages.error(request, "Invalid OTP. Please try again.")

    else:
        form = OTPForm()

    return render(request, "helphop/verify.html", {"form": form})



def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request,
                email=form.cleaned_data["email"],
                password=form.cleaned_data["password"],
            )
            if user:
                login(request, user)
                return redirect("customer_home")
            else:
                messages.error(request, "Invalid credentials or unverified account")
    else:
        form = LoginForm()

    return render(request, "helphop/login.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("login")





# landing
def landing(request):
    return render(request, "helphop/landing.html")


# contact
def contact(request):
    return render(request, "helphop/contact.html")

# home
def customer_home(request):
    return render(request, 'helphop/customer_home.html')



# profile
def customer_profile(request):
    user = request.user
    if user.is_authenticated:
        full_name = (user.get_full_name() or user.username or '').strip() or 'Your name'
        parts = full_name.split()
        initials = (parts[0][0] + parts[-1][0]).upper() if len(parts) >= 2 else full_name[:2].upper()
        try:
            profile = user.profile
            phone = profile.phone_number
        except Profile.DoesNotExist:
            phone = ''
    else:
        full_name = 'Your name'
        initials = '?'
        phone = ''
    context = {
        'user_full_name': full_name,
        'user_email': user.email if user.is_authenticated else '',
        'user_phone': phone,
        'user_initials': initials,
    }
    return render(request, 'helphop/customer_profile.html', context)

# settings
def customer_settings(request):
    return render(request, 'helphop/customer_settings.html')

# services
def customer_services(request):
    return render(request, 'helphop/customer_services.html')

# dashboard
def customer_dashboard(request):
    return render(request, 'helphop/customer_dashboard.html')


# book now
def book_now(request):
    return render(request, 'helphop/book_now.html')


# schedule
def schedule(request):
    return render(request, 'helphop/schedule.html')

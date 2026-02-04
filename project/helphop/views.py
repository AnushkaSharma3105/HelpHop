from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import RegisterForm
from .models import Profile

import random
from django.core.mail import send_mail
from .models import EmailOTP




# Login
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            if not user.is_active:
                messages.error(request, 'Please verify your email first')
                return redirect('verify_email')

            login(request, user)
            return redirect('login')  
        else:
            messages.error(request, 'Invalid credentials')

    return render(request, 'helphop/login.html')


# Register
def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            Profile.objects.create(
                user=user,
                phone_number=form.cleaned_data['phone_number']
            )

            otp = str(random.randint(100000, 999999))

            EmailOTP.objects.create(user=user, otp=otp)

            send_mail(
                'HelpHop Email Verification',
                f'Your OTP is {otp}',
                'noreply@helphop.com',
                [user.email],
                fail_silently=False,
            )

            return redirect('verify_email')


    else:
        form = RegisterForm()

    return render(request, 'helphop/register.html', {'form': form})




# OTP verification
def verify_email(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        otp_entered = request.POST.get('otp')

        try:
            user = User.objects.get(username=username)
            email_otp = EmailOTP.objects.get(user=user)

            if email_otp.otp == otp_entered:
                user.is_active = True
                user.save()
                email_otp.delete()   
                messages.success(request, 'Email verified successfully. You can login now.')
                return redirect('login')
            else:
                messages.error(request, 'Invalid OTP')

        except User.DoesNotExist:
            messages.error(request, 'User not found')
        except EmailOTP.DoesNotExist:
            messages.error(request, 'OTP not found')

    return render(request, 'helphop/verify.html')

def landing(request):
    return render(request, "helphop/landing.html")
def register_user(request):
    return render(request, "helphop/register_user.html")
def login_view(request):
    return render(request, "helphop/login.html")
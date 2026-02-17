from django import forms
from .models import User
from django.core.exceptions import ValidationError
import re


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "user_type",
            "password",
            "password_confirm",
        ]

    # First Name Validation (letters only)
    def clean_first_name(self):
        first_name = self.cleaned_data.get("first_name")
        if not first_name.isalpha():
            raise ValidationError("First name should contain letters only.")
        return first_name

    # Last Name Validation (letters only)
    def clean_last_name(self):
        last_name = self.cleaned_data.get("last_name")
        if not last_name.isalpha():
            raise ValidationError("Last name should contain letters only.")
        return last_name

    # Email validation (uniqueness + valid format)
    def clean_email(self):
        email = self.cleaned_data.get("email")

        # Basic format check 
        if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email):
            raise ValidationError("Enter a valid email address.")

        if User.objects.filter(email=email).exists():
            raise ValidationError("This mail id is already registered.")

        return email

    #  Full Form Validation
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        # Password length check
        if password and len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long.")

        # Strong password check (at least 1 letter + 1 number)
        if password and not re.search(r"[A-Za-z]", password):
            raise ValidationError("Password must contain at least one letter.")
        if password and not re.search(r"\d", password):
            raise ValidationError("Password must contain at least one number.")

        # Match check
        if password and password_confirm and password != password_confirm:
            raise ValidationError("Passwords do not match.")

        if password and password_confirm and password != password_confirm:
            self.add_error("password_confirm", "Passwords do not match.")
            
        return cleaned_data
    
    def clean_phone(self):
        phone = self.cleaned_data.get("phone")

        # Must contain only digits
        if not phone.isdigit():
            raise forms.ValidationError("Phone number should contain digits only.")

        # Must be exactly 10 digits
        if len(phone) != 10:
            raise forms.ValidationError("Phone number must be exactly 10 digits.")

        return phone


    def clean_password(self):
        password = self.cleaned_data.get("password")

        if len(password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long.")

        return password


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)


class OTPForm(forms.Form):
    otp = forms.CharField(max_length=6)

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# email and password validation
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    phone_number = forms.CharField(
        max_length=15,
        required=True,
        help_text="Enter a valid phone number"
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'phone_number', 'password1', 'password2']


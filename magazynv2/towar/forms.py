from django import forms
from .models import *
from django.contrib.auth.models import  User
from django.forms import CharField, Form, PasswordInput


class TowarForm(forms.ModelForm):

    class Meta:
        model = Towar
        fields = ('name', 'ilosc','categoria','uwagi')
    def clean_name(self):
        name = self.cleaned_data.get("name")
        return name
    def clean_ilosc(self):
        ilosc = self.cleaned_data.get("ilosc")
        return ilosc
class Logowanie(forms.ModelForm):
    password = CharField(widget=PasswordInput())
    class Meta:
        model = User
        fields = ('username',)
        widgets = { 'password': forms.PasswordInput(),}
    
    def clean_username(self):
        username = self.cleaned_data("username")
        return username
    def clean_password(self):
        password = self.cleaned_data("password")
        return password

class EdycjaUzytkownika(forms.ModelForm):
     class Meta:
        model = User
        fields = ('email','first_name','last_name')
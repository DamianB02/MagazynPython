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
    def clean_kategoria(self):
        kategoria = self.cleaned_data.get("categoria")
        return kategoria
    
    
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
        fields = ('first_name','last_name','email')
        
        
class ZmianaHasla(forms.Form):
    
    starehaslo = forms.CharField(label="Stare haslo:",widget=forms.PasswordInput())
    nowehaslo = forms.CharField(label="Nowe haslo:",widget=forms.PasswordInput())
    nowehaslo2 = forms.CharField(label="Powtorz nowe haslo:",widget=forms.PasswordInput())
    
    def clean_starehaslo(self):
        starehaslo = self.cleaned_data('starehaslo')
        if User.password != starehaslo:
            raise forms.ValidationError("Podane haslo jest niepoprawne!")
        return starehaslo
    
    def clean_nowehaslo(self):
        nowehaslo = self.cleaned_data('nowehaslo')
        starehaslo = self.cleaned_data('starehaslo')
        if nowehaslo == starehaslo:
            raise forms.ValidationError("Nowe haslo musi byc inne od starego!")
        return nowehaslo
    def clean_nowehaslo2(self):
        haslo2 = self.cleaned_data('nowehaslo2')
        haslo = self.cleaned_data('nowehaslo')
        if haslo!=haslo2:
            raise forms.ValidationError("Zle powtorzone haslo!")
        return haslo2
    
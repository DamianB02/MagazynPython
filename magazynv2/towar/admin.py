'''
Created on 17 lip 2017

@author: brzeckid
'''
from django.contrib import admin
from .models import Category
from .models import Towar
from django.contrib.auth.models import  User

class Uzytkownik(admin.ModelAdmin):
    list_display = ["__unicode__","first_name","last_name","email","date_joined","last_login"]
    class Meta:
        model = User
admin.site.unregister(User)
admin.site.register(User,Uzytkownik)       
admin.site.register(Category)
admin.site.register(Towar)
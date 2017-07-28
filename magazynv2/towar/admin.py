'''
Created on 17 lip 2017

@author: brzeckid
'''
from django.contrib import admin
from .models import Category
from .models import Towar
from django.contrib.auth.models import  User
    
admin.site.register(Category)
admin.site.register(Towar)
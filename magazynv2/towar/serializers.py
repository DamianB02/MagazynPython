from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Category
        fields = '__all__'
        
        

class TowarSerializer(serializers.ModelSerializer):
    categoria = CategorySerializer()
    
    class Meta:
        model = Towar
        fields = '__all__'
        
        
        

class LogSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Log
        fields = '__all__'
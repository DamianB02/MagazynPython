'''
Created on 14 lip 2017

@author: brzeckid
'''
from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField('Nazwa Kategorii',max_length=100)
    icon = models.ImageField('Ikona Kategorii', upload_to='icons', blank=True)
    
    class Meta:
        verbose_name = "Kategoria"
        verbose_name_plural = "Kategorie"
        
    
    def __unicode__(self):
        return self.name
    
    
class Towar(models.Model):
    name = models.CharField('Nazwa Towaru',max_length=100)
    ilosc = models.IntegerField('Ilosc')
    data_wprowadzenia = models.DateTimeField('Data wprowadzenia',default=timezone.now)
    categoria = models.ForeignKey(Category)
    osoba_wprowadzajaca = models.ForeignKey('auth.User')
    uwagi = models.CharField('Uwagi',max_length=100,null=True,blank=True) 
     
    class Meta:
        verbose_name = "Towar"
        verbose_name_plural = "Towary"
         
     
    def __unicode__(self):
        return self.name
     
     
class Log(models.Model):
    username = models.CharField('username',max_length=100)
    action = models.CharField('action',max_length=100)
    commodity = models.CharField('commodity',max_length=100)
    id_commodity = models.IntegerField('id_commodity')
    data_action = models.DateTimeField('data_action',default=timezone.now)
    
    class Meta:
        verbose_name = "Log"
        verbose_name_plural = "Logi"
        
    def __unicode__(self):
        return self.action
from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.models import  User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponseRedirect
from django.http.response import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.template.context_processors import request
from django.utils import timezone
import re

from towar.forms import Logowanie, EdycjaUzytkownika, ZmianaHasla
from towar.models import *

from .forms import TowarForm


def index(request):
    lista_towarow = Towar.objects.all()
#     page = request.GET.get('page', 1)
#     paginator = Paginator(lista_towarow, 5)
#     try:
#         users = paginator.page(page)
#     except PageNotAnInteger:
#         users = paginator.page(1)
#     except EmptyPage:
#         users = paginator.page(paginator.num_pages)
        
    pk = request.GET.get('pk')
    if pk!=None:
        post = get_object_or_404(Towar,pk=pk)
        post.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/')) 
    print request.POST
    if request.method == "POST":
        
        if not request.user.is_authenticated():
            log = Logowanie(request.POST or None)
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return render(request,'listatowarow.html',{'listatowarow': lista_towarow})
            return render(request,'logowanie.html',{'log': log})
        else:    
            form = TowarForm(request.POST or None)        
            if form.is_valid():
                print "dziala"
                post = form.save(commit=False)
                post.osoba_wprowadzajaca = request.user
                post.data_wprowadzenia = timezone.now()
                post.save()
                return render(request,'listatowarow.html',{'listatowarow': lista_towarow})
            else:
                return render(request,'dodanie_towaru.html',{'form': form})
    return render(request,'listatowarow.html',{'listatowarow': lista_towarow})
    
    
def form_logowanie(request):
    if not request.user.is_authenticated():
        log = Logowanie(request.POST or None)
        return render(request,'logowanie.html',{'log': log,})
    return HttpResponseRedirect("/")


def zmiana_dane_uzytkownik(request):
    print request.POST
    if request.user.is_authenticated():
        if request.method == "POST":
            try:
                user = request.user
                user.first_name = request.POST.get("imie")
                user.last_name = request.POST.get("nazwisko")
                user.email = request.POST.get("email")
                user.save()
            except Exception as e:
                print e
                return HttpResponse(e.message)
                          
        return HttpResponse("OK")
    else:
        return HttpResponse("Nie jest zalogowany")

def dodanie_nowego_towaru(request):
    print request.POST
    if request.user.is_authenticated():
        if request.method == "POST":
            try:
                nazwa = request.POST.get("nazwaTowaru")
                ilosc = request.POST.get("ilosc")
                kategoria = request.POST.get("kategoria")
                uwagi = request.POST.get("uwagi")
                osoba_wprowadzajaca = request.user
                towar = Towar(name= nazwa,
                              ilosc= ilosc,
                              categoria_id= kategoria,
                              osoba_wprowadzajaca = osoba_wprowadzajaca,
                               uwagi= uwagi)
                towar.save()
            except Exception as e:
                print e
                return HttpResponse(e.message)
                          
        return HttpResponse("OK")
    else:
        return HttpResponse("Nie jest zalogowany")    
    
def dane_uzytkownika(request):
       return render(request,'dane_uzytkownika.html')


def form_uzytkownik(request):
    if request.user.is_authenticated():
        return render(request,'edycja_uzytkownik.html')
    return HttpResponseRedirect("/")


def form_towar(request):
    if request.user.is_authenticated():
        lista_kategorie = Category.objects.all();
        return render(request,'dodanie_towaru.html',{'listakategorii': lista_kategorie})
    return HttpResponseRedirect("/")


def wyloguj(request):
    logout(request)
    return HttpResponseRedirect("/")
    
    
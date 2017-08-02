from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.models import  User
from django.http import HttpResponseRedirect
from django.http.response import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.template.context_processors import request
from django.utils import timezone
import re

from towar.models import *


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
    return render(request,'listatowarow.html',{'listatowarow': lista_towarow})


def remove(request):
    if request.user.is_authenticated():
        id = request.POST.get("id");
        try:
            post = get_object_or_404(Towar,pk=id)
            commodity = post.name
            username = request.user
            action = "Usuniecie"
            id_commodity = id
            log = Log(username=username,action=action,commodity=commodity,id_commodity=id_commodity)
            log.save() 
            post.delete()     
        except Exception as e:
                print e
                return HttpResponse(e.message)
        return HttpResponse("OK")
    else:
        return HttpResponse("Nie jestes zalogowany")

def szczegoly_uzytkownika(request):
    if request.user.is_superuser:
        pk = request.GET.get('pk')
        if pk!=None:
            post = get_object_or_404(User,pk=pk)
            
            return render(request,'wszystkie_dane_uzytkownika.html',{'szczegoly': post})
        return HttpResponseRedirect("/")
    return HttpResponseRedirect("/")


def lista_uzytkownikow(request):
    if request.user.is_superuser:
        lista_uzytkownikow = User.objects.all()
    
        return render(request,'listauzytkownikow.html',{'listauzytkownikow': lista_uzytkownikow})
    else:
        return HttpResponseRedirect("/")

def zmiana_hasla(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            try:
                user = request.user
                user2 = request.user
                if user.password==user2.password:  
                    user.set_password(request.POST.get("noweHaslo"))   
                    user.save()
                    u = authenticate(username=user.username, password=request.POST.get("noweHaslo"))
                if u is not None:
                    login(request, u)
                else:
                    return HttpResponse("Niepoprawne haslo")
            except Exception as e:
                print e
                return HttpResponse(e.message)
                          
        return HttpResponse("OK")
    else:
        return HttpResponse("Nie jest zalogowany")
    
    
def form_logowanie(request):
    if not request.user.is_authenticated():
        return render(request,'logowanie.html')
    return HttpResponseRedirect("/")


def spr_logowanie(request):
    if not request.user.is_authenticated():
        if request.method == "POST":
            try:
                username = request.POST.get('login')
                password = request.POST.get('haslo')
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    return HttpResponse("OK")
                else:
                    return HttpResponse("Podane zle dane")
            except Exception as e:
                print e
                return HttpResponse(e.message)
                          
        
    else:
        return HttpResponse("Jestes zalogowany")

def zmiana_dane_uzytkownik(request):
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
    if request.user.is_authenticated():
        if request.method == "POST":
            try:
                nazwa = request.POST.get("nazwaTowaru")
                ilosc = request.POST.get("ilosc")
                kategoria = request.POST.get("kategoria")
                uwagi = request.POST.get("uwagi")
                osoba_wprowadzajaca = request.user
                commodity = nazwa
                username = request.user
                action = "Dodanie"
                towar = Towar(name= nazwa,
                              ilosc= ilosc,
                              categoria_id= kategoria,
                              osoba_wprowadzajaca = osoba_wprowadzajaca,
                               uwagi= uwagi)
                towar.save()
                id_commodity = towar.id
                log = Log(username=username,action=action,commodity=commodity,id_commodity=id_commodity)
                log.save() 
            except Exception as e:
                print e
                return HttpResponse(e.message)
                          
        return HttpResponse("OK")
    else:
        return HttpResponse("Nie jest zalogowany")    
 
 
def lista_logi(request):
     logi = Log.objects.all()
     return render(request,'lista_logi.html',{'listalogi': logi})
 
    
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
    try:
        logout(request)
    except Exception as e:
        print e
        return HttpResponse(e.message)
    return HttpResponse("OK")
    
    
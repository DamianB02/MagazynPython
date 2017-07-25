from django.template import RequestContext
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from towar.models import *
from django.template.context_processors import request
from .forms import TowarForm
from django.utils import timezone
from django.http import HttpResponseRedirect
from towar.forms import Logowanie, EdycjaUzytkownika
from django.contrib.auth import authenticate, login , logout



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
#         
    if request.method == "POST":
        if not request.user.is_authenticated():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
            
    form = TowarForm(request.POST or None)        
    if form.is_valid():
        post = form.save(commit=False)
        post.osoba_wprowadzajaca = request.user
        post.data_wprowadzenia = timezone.now()
        post.save()
    return render(request,'listatowarow.html',{'listatowarow': lista_towarow})


def form_logowanie(request):
    log = Logowanie(request.POST or None)
    return render(request,'logowanie.html',{'log': log,})


def form_towar(request):
    form = TowarForm(request.POST or None)
    return render(request,'dodanie_towaru.html',{'form': form,})


def dane_uzytkownika(request):
    if request.method == "POST":
        edycja = EdycjaUzytkownika(request.POST, instance=request.user)
        if edycja.is_valid():
            edyt = edycja.save(commit=False)
            edyt.save()
    return render(request,'dane_uzytkownika.html')


def form_uzytkownik(request):
    uzytkownik = EdycjaUzytkownika(instance=request.user)
    return render(request,'edycja_uzytkownik.html',{'uzytkownik': uzytkownik,})


def wyloguj(request):
    logout(request)
    return HttpResponseRedirect("/")
    
    
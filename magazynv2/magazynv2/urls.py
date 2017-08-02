from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Examples:
    # url(r'^$', 'magazynv2.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^listaLogi$', 'towar.views.lista_logi', name = 'listaLogi'),
    url(r'^remove$', 'towar.views.remove', name = 'remove'),
    url(r'^szczegolyUzytkownika$', 'towar.views.szczegoly_uzytkownika', name = 'szczegolyUzytkownika'),
    url(r'^listaUzytkownikow$', 'towar.views.lista_uzytkownikow', name = 'listaUzytkownikow'),
    url(r'^wyloguj$', 'towar.views.wyloguj', name = 'wyloguj'),
    url(r'^formUzytkownik$', 'towar.views.form_uzytkownik', name = 'formUzytkownik'),
    url(r'^zmianadaneUzytkownika$', 'towar.views.zmiana_dane_uzytkownik', name = 'zmianaDaneUzytkownik'),
    url(r'^daneUzytkownika$', 'towar.views.dane_uzytkownika', name = 'daneUzytkownika'),
    url(r'^dodanieNowegoTowaru$', 'towar.views.dodanie_nowego_towaru', name = 'dodanieNowegoTowaru'),
    url(r'^dodanieTowaru$', 'towar.views.form_towar', name = 'dodanieTowaru'),
    url(r'^zmianaHasla$', 'towar.views.zmiana_hasla', name = 'zmianaHasla'),
    url(r'^logowanie$', 'towar.views.form_logowanie', name = 'logowanie'),
    url(r'^sprLogowanie$', 'towar.views.spr_logowanie', name = 'sprLogowanie'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$','towar.views.index',name='listatowarow'),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

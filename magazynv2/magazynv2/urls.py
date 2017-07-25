from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'magazynv2.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^wyloguj$', 'towar.views.wyloguj', name = 'wyloguj'),
    url(r'^edycjaUzytkownika$', 'towar.views.form_uzytkownik', name = 'edycjaUzytkownika'),
    url(r'^daneUzytkownika$', 'towar.views.dane_uzytkownika', name = 'daneUzytkownika'),
    url(r'^dodanieTowaru$', 'towar.views.form_towar', name = 'dodanieTowaru'),
    url(r'^logowanie$', 'towar.views.form_logowanie', name = 'logowanie'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$','towar.views.index',name='listatowarow'),
    
]

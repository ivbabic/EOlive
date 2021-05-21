from django.urls import path
from django.conf.urls import url
from .views import  *
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('User/', userListView),
    path('User/<int:pk>', userDetailView),
    path('Evidencija/', evidencijagospodarstvaListView),
    path('Evidencija/<int:pk>', evidencijagospodarstvaDetailView),
    path('Berba/', berbaListView),
    path('Berba/<int:pk>', berbaDetailView),
    path('PodaciRadnje/', podaci_radnjeListView),
    path('PodaciRadnje/<int:pk>', podaci_radnjeDetailView),
    path('Prihranjivanje/', prihranjivanjeListView),
    path('Prihranjivanje/<int:pk>', prihranjivanjeDetailView),
    path('Spricanje/', spricanjeListView),
    path('Spricanje/<int:pk>', spricanjeDetailView),
]

urlpatterns = format_suffix_patterns(urlpatterns)
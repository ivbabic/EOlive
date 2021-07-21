from django.urls import path
from django.conf.urls import url
from .views import  *
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('User/', userListView),
    path('User/<int:pk>', userDetailView),
    path('Evidencija/', EvidencijagospodarstvaListView),
    path('Evidencija/<int:pk>', EvidencijagospodarstvaDetailView),
    path('Berba/', BerbaListView),
    path('Berba/<int:pk>', BerbaDetailView),
    path('PodaciRadnje/', Podaci_radnjeListView),
    path('PodaciRadnje/<int:pk>', Podaci_radnjeDetailView),
    path('Prihranjivanje/', PrihranjivanjeListView),
    path('Prihranjivanje/<int:pk>', PrihranjivanjeDetailView),
    path('Spricanje/', SpricanjeListView),
    path('Spricanje/<int:pk>', SpricanjeDetailView),
    path('currentUser/', Get_user_id )
]

urlpatterns = format_suffix_patterns(urlpatterns)
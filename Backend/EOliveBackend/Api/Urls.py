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
    path('Berba/<int:pk>', BerbaDetailView)
]

urlpatterns = format_suffix_patterns(urlpatterns)
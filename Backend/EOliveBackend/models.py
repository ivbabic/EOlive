from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Evidencijagospodarstva(models.Model):
    id = models.AutoField(primary_key=True)
    naziv_gosp = models.CharField(max_length=30)
    katastar = models.CharField(max_length=120)
    povrsina = models.CharField(max_length=50)
    datum = models.DateField(auto_now=False, auto_now_add=False)
    opis_radnje = models.CharField(max_length=50)
    User_id= models.ForeignKey('auth.User', on_delete=models.CASCADE)    
   

    def __str__(self):
        return self.naziv_gosp

class Berba(models.Model):
    id = models.AutoField(primary_key=True)
    vrstamaslina = models.CharField(max_length=120)
    datumb = models.DateField(auto_now=False, auto_now_add=False)
    katcest = models.CharField(max_length=120)
    kolicinaubrano = models.DecimalField(max_digits=10, decimal_places=2)
    doprinosulja = models.DecimalField(max_digits=10, decimal_places=2)
    User_id= models.ForeignKey('auth.User', on_delete=models.CASCADE)       

    def __str__(self):
        return self.vrstamaslina

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

User = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
highlighted = models.TextField()


class evidencijagospodarstva(models.Model):
    id = models.AutoField(primary_key=True)
    katastar = models.CharField(max_length=120)
    naselje = models.CharField(max_length=50)
    povrsina = models.CharField(max_length=50)
    naziv_gosp = models.CharField(max_length=30)
    User= models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)    
   

    def __str__(self):
        return self.naziv_gosp

class berba(models.Model):
    id = models.AutoField(primary_key=True)
    vrstamaslina = models.CharField(max_length=120)
    datumb = models.DateField(auto_now=False, auto_now_add=False)
    katcest = models.CharField(max_length=120)
    kolicinaubrano = models.DecimalField(max_digits=10, decimal_places=2)
    doprinosulja = models.DecimalField(max_digits=10, decimal_places=2)
    evidencijagospodarstva_id = models.ForeignKey(evidencijagospodarstva, on_delete=models.CASCADE)     

    def __str__(self):
        return self.vrstamaslina

class podaci_radnje(models.Model):
    id = models.AutoField(primary_key=True)
    vrstaradnje = models.CharField(max_length=120)
    katcest = models.CharField(max_length=120)
    datum = models.DateField(auto_now=False, auto_now_add=False)
    evidencijagospodarstva_id = models.ForeignKey(evidencijagospodarstva, on_delete=models.CASCADE)

    def __str__(self):
        return self.vrstaradnje

class prihranjivanje(models.Model):
    id = models.AutoField(primary_key=True)
    nazivprihrane = models.CharField(max_length=120)
    kolicinap = models.DecimalField(max_digits=10, decimal_places=2)
    katcest = models.CharField(max_length=120)
    datump = models.DateField(auto_now=False, auto_now_add=False)
    podaci_radnje_id = models.ForeignKey(podaci_radnje, on_delete=models.CASCADE)

    def __str__(self):
        return self.nazivprihrane

class spricanje(models.Model):
    id = models.AutoField(primary_key=True)
    nazivtek = models.CharField(max_length=120)
    kolicina = models.DecimalField(max_digits=10, decimal_places=2)
    katcest = models.CharField(max_length=120)
    datums = models.DateField(auto_now=False, auto_now_add=False)
    podaci_radnje_id = models.ForeignKey(podaci_radnje, on_delete=models.CASCADE)

    def __str__(self):
        return self.nazivtek

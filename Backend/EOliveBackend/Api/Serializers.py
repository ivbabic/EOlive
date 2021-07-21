
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from EOliveBackend.models import  evidencijagospodarstva, berba, podaci_radnje, prihranjivanje, spricanje
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyCustomTokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user')
class evidencijagospodarstvaSerializer(serializers.ModelSerializer):

    class Meta:
        model = evidencijagospodarstva
        fields = ('id', 'katastar', 'naselje', 'povrsina', 'naziv_gosp', 'User_id')


class berbaSerializer(serializers.ModelSerializer):
    evidencijagospodarstva_id = evidencijagospodarstvaSerializer(read_only=True)
    class Meta:
        model= berba
        fields = ('id', 'vrstamaslina', 'datumb', 'katcest', 'kolicinaubrano', 'doprinosulja', 'evidencijagospodarstva_id')

class podaci_radnjeSerializer(serializers.ModelSerializer):
    evidencijagospodarstva_id = evidencijagospodarstvaSerializer(read_only=True)
    class Meta:
        model= podaci_radnje
        fields = ('id', 'vrstaradnje', 'katcest', 'datum', 'evidencijagospodarstva_id')

class prihranjivanjeSerializer(serializers.ModelSerializer):
    vrstaradnje = podaci_radnjeSerializer(read_only=True)
    class Meta:
        model= prihranjivanje
        fields = ('id', 'nazivprihrane', 'kolicinap', 'katcest', 'datump', 'vrstaradnje')

class spricanjeSerializer(serializers.ModelSerializer):
    vrstaradnje = podaci_radnjeSerializer(read_only=True)
    class Meta:
        model= spricanje
        fields = ('id', 'nazivtek', 'kolicina', 'katcest', 'datums', 'vrstaradnje')



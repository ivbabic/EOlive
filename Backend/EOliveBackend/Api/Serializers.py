from rest_framework import serializers
from rest_framework.authtoken.models import Token
from EOliveBackend.models import  evidencijagospodarstva, berba, podaci_radnje, prihranjivanje, spricanje
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'id']

class TokenSerializer(serializers.ModelSerializer):

    def get_user(self, obj):
        User = self.context['request'].user.id
        print(User)
        return User

    user = serializers.SerializerMethodField('get_user')
    class Meta:
        model = Token
        fields = ('key', 'user') 

class evidencijagospodarstvaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = evidencijagospodarstva
        fields = ('katastar', 'naselje', 'povrsina', 'naziv_gosp', 'User')

class berbaSerializer(serializers.ModelSerializer):
    class Meta:
        model= berba
        fields = ('id', 'vrstamaslina', 'datumb', 'katcest', 'kolicinaubrano', 'doprinosulja', 'naziv_gosp')

class podaci_radnjeSerializer(serializers.ModelSerializer):
    class Meta:
        model= podaci_radnje
        fields = ('id', 'vrstaradnje', 'katcest', 'datum', 'naziv_gosp')

class prihranjivanjeSerializer(serializers.ModelSerializer):
    class Meta:
        model= prihranjivanje
        fields = ('id', 'nazivprihrane', 'kolicinap', 'katcest', 'datump', 'vrstaradnje')

class spricanjeSerializer(serializers.ModelSerializer):
    class Meta:
        model= spricanje
        fields = ('id', 'nazivtek', 'kolicina', 'katcest', 'datums', 'vrstaradnje')




from rest_framework import serializers
from rest_framework.authtoken.models import Token
from EOliveBackend.models import  *
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
class EvidencijagospodarstvaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evidencijagospodarstva
        fields = ('id', 'naziv_gosp', 'katastar', 'povrsina', 'datum', 'opis_radnje', 'User_id')


class BerbaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Berba
        fields = ('id', 'vrstamaslina', 'datumb', 'katcest', 'kolicinaubrano', 'doprinosulja', 'User_id')


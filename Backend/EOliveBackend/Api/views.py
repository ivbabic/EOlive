from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.models import User
from EOliveBackend.models import evidencijagospodarstva, berba, podaci_radnje, prihranjivanje, spricanje
from .Serializers import *
from rest_framework.permissions import IsAuthenticated


def get_queryset(self):
    user = self.request.User
    return user.accounts.all()


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def userListView(request, format=None):

    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.AllowAny,))
def userDetailView(request, pk, format=None):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.method == 'PUT':
        serializer = UserSerializer(User, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        User.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def EvidencijagospodarstvaListView(request, format=None):
    if request.method == 'GET':
        data = evidencijagospodarstva.objects.all()
        serializer = evidencijagospodarstvaSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = evidencijagospodarstvaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def EvidencijagospodarstvaDetailView(request, pk, format=None):
    try:
        evidencija = evidencijagospodarstva.objects.get(pk=pk)
    except evidencija.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        evidencija.delete()
        serializer = evidencijagospodarstvaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        evidencija.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated))
def BerbaListView(request, format=None):

    if request.method == 'GET':
        data = berba.objects.all()
        serializer = berbaSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = berbaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def BerbaDetailView(request, pk, format=None):
    try:
        Ber = berba.objects.get(pk=pk)
    except Ber.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = berbaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Ber.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def Podaci_radnjeListView(request, format=None):

    if request.method == 'GET':
        data = podaci_radnje.objects.all()
        serializer = podaci_radnjeSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = podaci_radnjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def Podaci_radnjeDetailView(request, pk, format=None):
    try:
        podaci = podaci_radnje.objects.get(pk=pk)
    except podaci.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = podaci_radnjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        podaci.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def PrihranjivanjeListView(request, format=None):

    if request.method == 'GET':
        data = prihranjivanje.objects.all()
        serializer = prihranjivanjeSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = prihranjivanjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def PrihranjivanjeDetailView(request, pk, format=None):
    try:
        prihrana = prihranjivanje.objects.get(pk=pk)
    except prihrana.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = prihranjivanjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prihrana.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def SpricanjeListView(request, format=None):

    if request.method == 'GET':
        data = spricanje.objects.all()
        serializer = spricanjeSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = spricanjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def SpricanjeDetailView(request, pk, format=None):
    try:
        spric = spricanje.objects.get(pk=pk)
    except spric.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = spricanjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        spric.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

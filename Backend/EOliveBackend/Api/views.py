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
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from EOliveBackend.models import evidencijagospodarstva, berba, podaci_radnje, prihranjivanje, spricanje 
from .Serializers import *

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
        User = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.method == 'PUT':
        serializer = UserSerializer(User, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def evidencijagospodarstvaListView(request, format=None):

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
@permission_classes((permissions.IsAuthenticated,))
def evidencijagospodarstvaDetailView(request, pk, format=None):
    try:
        evidencijagospodarstva = evidencijagospodarstva.objects.get(pk=pk)
    except evidencijagospodarstva.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = evidencijagospodarstvaSerializer(evidencijagospodarstva, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        evidencijagospodarstva.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def berbaListView(request, format=None):

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
def berbaDetailView(request, pk, format=None):
    try:
        berba = berba.objects.get(pk=pk)
    except berba.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = berbaSerializer(berba, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        berba.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def podaci_radnjeListView(request, format=None):

    if request.method == 'GET':
        data = podaci_radnje.objects.all()
        serializer = podaci_radnjserializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = podaci_radnjserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def podaci_radnjeDetailView(request, pk, format=None):
    try:
        podaci_radnje = podaci_radnje.objects.get(pk=pk)
    except podaci_radnje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = podaci_radnjserializer(podaci_radnje, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        podaci_radnje.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def prihranjivanjeListView(request, format=None):

    if request.method == 'GET':
        data = prihranjivanje.objects.all()
        serializer = prihranjivanjserializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = prihranjivanjserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def prihranjivanjeDetailView(request, pk, format=None):
    try:
        prihranjivanje = prihranjivanje.objects.get(pk=pk)
    except prihranjivanje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = prihranjivanjserializer(prihranjivanje, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prihranjivanje.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def spricanjeListView(request, format=None):

    if request.method == 'GET':
        data = spricanje.objects.all()
        serializer = spricanjserializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = spricanjserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def spricanjeDetailView(request, pk, format=None):
    try:
        spricanje = spricanje.objects.get(pk=pk)
    except spricanje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = spricanjserializer(spricanje,  data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        spricanje.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

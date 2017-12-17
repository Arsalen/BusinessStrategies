# coding=utf-8
from django.shortcuts import render
from rest_framework import viewsets, generics, status
from .serializers import ClientSerializer, MessageSerializer, SearchSerializer, ManageSearchSerializer, PreferenceSerializer
from .models import Client, Message, Search, ManageSearch, Preference

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
import  simplejson
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


class ClientList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return Client.objects.get(pk=pk)
        except Client.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ClientSerializer(snippet)
        return Response(serializer.data)


    def put(self, request, pk, format=None):

        snippet = self.get_object(request.data['id'])
        if ( int(pk) == request.data['id'] ):
            if (snippet.password == request.data['oldpassword']):
                serializer = ClientSerializer(snippet, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
        else:
            serializer = ClientSerializer(snippet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ClientAuth(APIView):
    #permission_classes = (IsAuthenticated,)
    def get_object(self, request):
        try:
            return Client.objects.get(email=request['email'],password=request['password'],admn=request['admin'])
        except Client.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        snippet = self.get_object(request.data)
        serializer = ClientSerializer(snippet)
        if(serializer.data['held'] == False):
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


                ################################################################################################################################

class MessageList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class MessageDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = MessageSerializer(snippet)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = MessageSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    ################################################################################################################################



class SearchList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        searchs = Search.objects.all()
        serializer = SearchSerializer(searchs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        #print(simplejson.loads(request.body)['period'])
        #from rest_framework import status
        serializer = SearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return Search.objects.get(pk=pk)
        except Search.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SearchSerializer(snippet)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SearchSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    ################################################################################################################################




class ManageSearchList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        managesearchs = ManageSearch.objects.all()
        serializer = ManageSearchSerializer(managesearchs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ManageSearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageSearchDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return ManageSearch.objects.get(pk=pk)
        except ManageSearch.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ManageSearchSerializer(snippet)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ManageSearchSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    ################################################################################################################################



class PreferenceList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        preferences = Preference.objects.all()
        serializer = PreferenceSerializer(preferences, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = PreferenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PreferenceDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return Preference.objects.get(pk=pk)
        except Preference.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PreferenceSerializer(snippet)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PreferenceSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    ################################################################################################################################

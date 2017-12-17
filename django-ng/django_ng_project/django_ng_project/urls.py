"""django_ng_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import *
from django.contrib import admin
from rest_framework import routers
from django_ng_app import views

from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^Message/$', views.MessageList.as_view()),
    url(r'^Message/(?P<pk>[0-9]+)/$', views.MessageDetail.as_view()),

    url(r'^Client/$', views.ClientList.as_view()),
    url(r'^Client/(?P<pk>[0-9]+)/$', views.ClientDetail.as_view()),
    url(r'^ClientAuth/$', views.ClientAuth.as_view()),
    #url(r'^Client/(?P<pk>[0-9]+)/$', views.ClientAuth.as_view()),


    url(r'^Search/$', views.SearchList.as_view()),
    url(r'^Search/(?P<pk>[0-9]+)/$', views.SearchDetail.as_view()),

    url(r'^ManageSearch/$', views.ManageSearchList.as_view()),
    url(r'^ManageSearch/(?P<pk>[0-9]+)/$', views.ManageSearchDetail.as_view()),

    url(r'^Preference/$', views.PreferenceList.as_view()),
    url(r'^Preference/(?P<pk>[0-9]+)/$', views.PreferenceDetail.as_view()),

    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^admin/', admin.site.urls),





    #url(r'^User/$', views.UserList.as_view()),
    #url(r'^User/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)
from .models import Client, Message, Search, ManageSearch, Preference
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'email', 'password', 'firstName', 'lastName', 'company', 'sector', 'function', 'held', 'admn')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'id_sender', 'mail', 'content')


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('client_id',
                  'expression',
                  'plateform_1',
                  'plateform_2',
                  'plateform_3',
                  'FbUrl',
                  'period',
                  'analysis_1',
                  'analysis_2',
                  'analysis_3',
                  'analysis_4' ,
                  'tweet_positive' ,
                  'tweet_negative',
                  'tweet_neutre',
                  'female_tweet',
                  'male_tweet',
                  'commentaire_negative',
                  'commentaire_positive',
                  'commentaire_neutre',
                  'female_comment',
                  'male_comment',
                  'comment_positive',
                  'comment_negative')


class ManageSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManageSearch
        fields = ('searches', 'key', 'regex')



class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = ('id', 'client_id', 'sector', 'url')
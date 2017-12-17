from django.db import models

class Client(models.Model):
    email = models.EmailField(max_length=32, default="email@email.com")
    password = models.TextField(max_length=32, default="pass")
    firstName = models.TextField(max_length=32)
    lastName = models.TextField(max_length=32)
    company = models.TextField(max_length=32)
    sector = models.TextField(max_length=32)
    function = models.TextField(max_length=32)
    held = models.BooleanField(default=True)
    admn = models.BooleanField(default=False)

#{ "email":"test@mail.com", "password":"pass", "firstName":"first", "lastName":"last", "company":"comp", "sector":"sect", "function":"funct", "held":"False", "admn":"False" }

class Message(models.Model):
    id_sender = models.ForeignKey(Client,default=0)
    mail = models.EmailField(null=False)
    content = models.TextField(max_length=254)


class Preference(models.Model):
    client_id = models.ForeignKey(Client)
    sector = models.TextField()
    url = models.URLField()


class ManageSearch(models.Model):
    searches = models.IntegerField()
    key = models.IntegerField()
    regex = models.TextField()

class Search(models.Model):
    FACEBOOK = 'fb'
    TWITTER = 'tw'
    FOODLY = 'fd'
    EMPTY = ''
    PLATEFORM_CHOICES = (
        (FACEBOOK, 'Facebook'),
        (TWITTER, 'Twitter'),
        (FOODLY, 'Foodly'),
        (EMPTY, ''),
        )

    LONG = 'lg'
    MEDIUM = 'md'
    SHORT = 'sh'

    PERIOD_CHOICES = (
        (LONG, 'long'),
            (MEDIUM, 'medium'),
            (SHORT, 'short'),
    )

    LOCATION = 'lc'
    GENDER = 'gd'
    AGE = 'ag'
    REVIEW = 'rv'
    EMPTY = ''
    ANALYSIS_CHOICES = (
        (LOCATION, 'location'),
        (GENDER, 'gender'),
        (AGE, 'age'),
        (REVIEW, 'review'),
        (EMPTY, ''),
    )

    client_id = models.ForeignKey(Client)

    expression = models.TextField(max_length=254,default=None)

    plateform_1 = models.CharField(max_length=2, choices=PLATEFORM_CHOICES, default=None)
    plateform_2 = models.CharField(max_length=2, choices=PLATEFORM_CHOICES, default=None)
    plateform_3 = models.CharField(max_length=2, choices=PLATEFORM_CHOICES, default=None)

    FbUrl = models.TextField(max_length=254)

    period = models.CharField(max_length=2, choices=PERIOD_CHOICES)

    analysis_1 = models.CharField(max_length=2, choices=ANALYSIS_CHOICES, default=None)
    analysis_2 = models.CharField(max_length=2, choices=ANALYSIS_CHOICES, default=None)
    analysis_3 = models.CharField(max_length=2, choices=ANALYSIS_CHOICES, default=None)
    analysis_4 = models.CharField(max_length=2, choices=ANALYSIS_CHOICES, default=None)
    tweet_positive = models.CharField(max_length=5, default='None')
    tweet_negative = models.CharField(max_length=5, default='None')
    tweet_neutre = models.CharField(max_length=5, default='None')
    female_tweet = models.CharField(max_length=5, default='None')
    male_tweet = models.CharField(max_length=5, default='None')
    commentaire_negative = models.CharField(max_length=5, default='None')
    commentaire_positive = models.CharField(max_length=5, default='None')
    commentaire_neutre = models.CharField(max_length=5, default='None')
    female_comment = models.CharField(max_length=5, default='None')
    male_comment = models.CharField(max_length=5, default='None')
    comment_positive = models.CharField(max_length=5, default='None')
    comment_negative = models.CharField(max_length=5, default='None')
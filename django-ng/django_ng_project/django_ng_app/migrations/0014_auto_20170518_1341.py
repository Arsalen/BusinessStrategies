# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-18 13:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_ng_app', '0013_auto_20170516_0106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='search',
            name='comment_negative',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='comment_positive',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='commentaire_negative',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='commentaire_neutre',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='commentaire_positive',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='female_comment',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='female_tweet',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='male_comment',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='male_tweet',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='tweet_negative',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='tweet_neutre',
            field=models.CharField(default=b'None', max_length=5),
        ),
        migrations.AlterField(
            model_name='search',
            name='tweet_positive',
            field=models.CharField(default=b'None', max_length=5),
        ),
    ]

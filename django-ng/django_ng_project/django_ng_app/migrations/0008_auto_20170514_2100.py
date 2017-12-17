# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-14 21:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_ng_app', '0007_auto_20170514_2047'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='admn',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='email@email.com', max_length=32),
        ),
        migrations.AddField(
            model_name='user',
            name='held',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.TextField(default='pass', max_length=32),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-14 21:19
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django_ng_app', '0008_auto_20170514_2100'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Client',
        ),
    ]

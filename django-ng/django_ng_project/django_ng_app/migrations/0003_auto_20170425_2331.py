# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-25 23:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_ng_app', '0002_auto_20170425_2318'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail', models.EmailField(max_length=254, null=True)),
                ('content', models.TextField(default='empty message', max_length=254)),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='content',
        ),
        migrations.RemoveField(
            model_name='user',
            name='mail',
        ),
        migrations.AddField(
            model_name='user',
            name='admn',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='firstName',
            field=models.TextField(max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='lastName',
            field=models.TextField(max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.TextField(max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.TextField(max_length=32, null=True),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-15 15:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_ng_app', '0010_auto_20170515_1444'),
    ]

    operations = [
        migrations.AlterField(
            model_name='search',
            name='analysis_1',
            field=models.CharField(choices=[('lc', 'location'), ('gd', 'gender'), ('ag', 'age'), ('rv', 'review'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='analysis_2',
            field=models.CharField(choices=[('lc', 'location'), ('gd', 'gender'), ('ag', 'age'), ('rv', 'review'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='analysis_3',
            field=models.CharField(choices=[('lc', 'location'), ('gd', 'gender'), ('ag', 'age'), ('rv', 'review'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='analysis_4',
            field=models.CharField(choices=[('lc', 'location'), ('gd', 'gender'), ('ag', 'age'), ('rv', 'review'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='plateform_1',
            field=models.CharField(choices=[('fb', 'Facebook'), ('tw', 'Twitter'), ('fd', 'Foodly'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='plateform_2',
            field=models.CharField(choices=[('fb', 'Facebook'), ('tw', 'Twitter'), ('fd', 'Foodly'), ('', '')], default=None, max_length=2),
        ),
        migrations.AlterField(
            model_name='search',
            name='plateform_3',
            field=models.CharField(choices=[('fb', 'Facebook'), ('tw', 'Twitter'), ('fd', 'Foodly'), ('', '')], default=None, max_length=2),
        ),
    ]

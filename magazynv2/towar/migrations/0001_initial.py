# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'Nazwa Kategorii')),
                ('slug', models.SlugField(unique=True, max_length=100, verbose_name=b'Odnosnik')),
                ('icon', models.ImageField(upload_to=b'icons', verbose_name=b'Ikona Kategorii', blank=True)),
            ],
            options={
                'verbose_name': 'Kategoria',
                'verbose_name_plural': 'Kategorie',
            },
        ),
        migrations.CreateModel(
            name='Towar',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'Nazwa Towaru')),
                ('slug', models.SlugField(unique=True, max_length=100, verbose_name=b'Odnosnik')),
                ('ilosc', models.IntegerField(verbose_name=b'Ilosc')),
                ('data_wprowadzenia', models.DateTimeField(auto_now_add=True, verbose_name=b'Data wprowadzenia')),
                ('uwagi', models.CharField(max_length=100, null=True, verbose_name=b'Uwagi')),
                ('categoria', models.ForeignKey(to='towar.Category')),
                ('osoba_wprowadzajaca', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Towar',
                'verbose_name_plural': 'Towary',
            },
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('towar', '0004_auto_20170727_1410'),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=100, verbose_name=b'username')),
                ('action', models.CharField(max_length=100, verbose_name=b'action')),
                ('commodity', models.CharField(max_length=100, verbose_name=b'commodity')),
                ('id_commodity', models.IntegerField(verbose_name=b'id_commodity')),
                ('data_action', models.DateTimeField(default=django.utils.timezone.now, verbose_name=b'data_action')),
            ],
            options={
                'verbose_name': 'Log',
                'verbose_name_plural': 'Logi',
            },
        ),
    ]

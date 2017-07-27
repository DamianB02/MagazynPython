# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('towar', '0003_auto_20170718_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='towar',
            name='data_wprowadzenia',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name=b'Data wprowadzenia'),
        ),
    ]

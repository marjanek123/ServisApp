# Generated by Django 3.2.11 on 2022-06-29 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import servis.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('town', models.CharField(max_length=30)),
                ('street', models.CharField(max_length=30)),
                ('nr_house', models.CharField(max_length=10)),
                ('tel', models.CharField(max_length=12)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('godzina_wizyty', models.TimeField(blank=True)),
                ('godzina_wizyty2', models.TimeField(blank=True)),
                ('description', models.TextField(max_length=500)),
                ('bussy', models.BooleanField(default=False)),
                ('data_wizyty', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('done', models.BooleanField(default=False)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='client', to='servis.clients')),
            ],
            options={
                'ordering': ['godzina_wizyty'],
            },
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('about', models.TextField(max_length=500)),
                ('person', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='group', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Members',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_joined', models.DateField(auto_now_add=True)),
                ('permissions', models.CharField(choices=[('NO', 'NO_ALLOWED'), ('CE', 'CENTRAL_ADMIN'), ('SS', 'SUPER_SERWISANT'), ('SE', 'SERWISANT')], default='NO', max_length=2)),
                ('is_accepted', models.BooleanField(default=False)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='servis.group')),
                ('person', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='personmembers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('description_work', models.TextField(max_length=500)),
                ('done', models.BooleanField(default=False)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='work', to='servis.event')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groupwork', to='servis.group')),
                ('servisant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='servisant_work', to='servis.members')),
            ],
        ),
        migrations.CreateModel(
            name='Stove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_stove', to='servis.group')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='MagicCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=servis.models.generate_unique_code, max_length=8, unique=True)),
                ('person', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='magiccode', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event', to='servis.group'),
        ),
        migrations.AddField(
            model_name='event',
            name='servisant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='servisant', to='servis.members'),
        ),
        migrations.AddField(
            model_name='clients',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clients', to='servis.group'),
        ),
        migrations.AddField(
            model_name='clients',
            name='stove',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stove', to='servis.stove'),
        ),
    ]

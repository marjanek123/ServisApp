from tokenize import group
from django.db import models
from pkg_resources import require
from accounts.models import Person
import random
import string
import datetime

# from calendar import HTMLCalendar
# Create your models here.


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if MagicCode.objects.filter(code=code).count() == 0:
            break
    return code


class MagicCode(models.Model):

    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    person = models.OneToOneField(
        Person, related_name="magiccode", on_delete=models.CASCADE)

    def __str__(self):
        return self.person.username

class GroupManager(models.Manager):
    def get_group(self, group):
        group = Group.objects.filter(
            id=group)
            
        return group



        
class Group(models.Model):
    name = models.CharField(max_length=20)
    about = models.TextField(max_length=500)
    person = models.OneToOneField(
        Person, related_name="group", on_delete=models.CASCADE)
    # users = models.ForeignKey(
    #     Servisants, related_name='%(class)s_requests_created', on_delete=models.DO_NOTHING, default=None)
    objects = GroupManager()
    def __str__(self):
        return self.name


class MembersManager(models.Manager):
    def get_members_to_messages(self, group):
        members = Members.objects.filter(
            group=group, is_accepted=True)
        return members

    def get_all_members(self, group, user):
        members = Members.objects.filter(
            group=group, is_accepted=True).exclude(person = user)
        return members

    

    def create_member(self, person, group, **extra_fields):
        person_instance = Person.objects.get(id=person)
        group_instance = Group.objects.get(id= group)

        member = self.model(person=person_instance,
                            group=group_instance, **extra_fields)

        member.save()
        return member

    def create_admin_member(self, person, **extra_fields):
        person_instance = Person.objects.get(id=person)
        group_instance = Group.objects.get(person = person_instance)
        extra_fields.setdefault('permissions', "CE")
        member = self.model(person=person_instance,
                            group=group_instance, **extra_fields)

        member.save()
        return member


class Members(models.Model):
    STATUS = (
        ('NO', 'NO_ALLOWED'),
        ('CE', 'CENTRAL_ADMIN'),
        ('SS', 'SUPER_SERWISANT'),
        ('SE', 'SERWISANT'),
    )
    person = models.OneToOneField(
        Person, related_name="personmembers",  on_delete=models.DO_NOTHING)
    date_joined = models.DateField(auto_now_add=True)
    permissions = models.CharField(max_length=2, choices=STATUS, default='NO')
    group = models.ForeignKey(
        Group, related_name="members", on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)

    objects = MembersManager()

    def __str__(self):
        return "member {}".format(self.person.username)


class ClientsMenager(models.Manager):
    def create_client(self, first_name, kod_pocztowy, town, street, nr_house, group):
        self.model(first_name=first_name, kod_pocztowy=kod_pocztowy,
                   town=town, street=street, nr_house=nr_house, group=group)

    def get_all_clients_group(self, group):
        clients = Clients.objects.filter(group=group)
        return clients

class Stove(models.Model):
    name = models.CharField(max_length=30)
    group = models.ForeignKey(
        Group, related_name="group_stove", on_delete=models.CASCADE)
    class Meta:
        ordering = ['name']
    def __str__(self):
        return self.name

class Clients(models.Model):
    first_name = models.CharField(max_length=30)
    town = models.CharField(max_length=30)
    street = models.CharField(max_length=30)
    nr_house = models.CharField(max_length=10)
    tel  = models.CharField(max_length=12)
    stove = models.ForeignKey(
        Stove, related_name="stove", blank=True, null=True, on_delete=models.CASCADE)
    group = models.ForeignKey(
        Group, related_name="clients", on_delete=models.CASCADE)

    objects = ClientsMenager()

    def __str__(self):
        return self.first_name



class EventMenager(models.Manager):
    def current_events(self, group):
        events = Event.objects.filter(
            group=group, data_wizyty=datetime.now().date())
        return events

    def get_member_events(self, servisant_id, group):
        events = Event.objects.filter(
            group=group, servisant_id=servisant_id, data_wizyty=datetime.now().date())
        return events
    def get_last_client_events(self, client_id,  group):
        events = Event.objects.filter(group_id = group, client_id=client_id)
        return events

class AbstractEvent(models.Model):
    bussy = models.BooleanField(default=False)
    data_wizyty = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    group = models.ForeignKey(
        Group, related_name="event", on_delete=models.CASCADE)
    class Meta:
        abstract = True

class Event(models.Model):
    client = models.ForeignKey(
        Clients,  on_delete=models.DO_NOTHING, related_name="client", blank=True, null=True)
    servisant = models.ForeignKey(
        Members,  on_delete=models.DO_NOTHING, related_name="servisant")
    godzina_wizyty = models.TimeField(blank=True)
    godzina_wizyty2 = models.TimeField(blank=True)
    description = models.TextField(max_length=500)
    # start_time = models.DateTimeField()
    # end_time = models.DateTimeField()
    bussy = models.BooleanField(default=False)
    data_wizyty = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    done = models.BooleanField(default=False, blank=False, null=False)
    group = models.ForeignKey(
        Group, related_name="event", on_delete=models.CASCADE)

    REQUIRED_FIELDS = ['data_wizyty']

    objects = EventMenager()

    def __str__(self):
        return "servisant {} u {} dnia {}".format(self.servisant, self.client, self.data_wizyty)

    class Meta:
        ordering = ['godzina_wizyty']

class WorksMenager(models.Manager):
    def all_works(self, group):
        works = Work.objects.filter(group_id = group)
        return works

    def servisant_works(self, group, servisant):
        works = Work.objects.filter(group_id = group, servisant_id = servisant)
        return works

class Work(models.Model):
    event = models.ForeignKey(
        Event,  on_delete=models.DO_NOTHING, related_name="work")
    servisant = models.ForeignKey(
        Members,  on_delete=models.CASCADE, related_name="servisant_work")
    created_at = models.DateTimeField(auto_now_add=True)
    description_work = models.TextField(max_length=500)
    # start_time = models.DateTimeField()
    # end_time = models.DateTimeField()
    done = models.BooleanField(default=False)

    group = models.ForeignKey(
        Group, related_name="groupwork", on_delete=models.CASCADE)

    # REQUIRED_FIELDS = ['data_wizyty']

    objects = WorksMenager()

    def __str__(self):
        return self.description_work


from accounts.models import Person
from servis.models import Group
from django.db import models

def nameFile(instance, filename):
    return '/'.join(['images', filename])

class Message(models.Model):
    sender = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='receiver')
    message = models.CharField(max_length=1200)
    img = models.ImageField(blank=True, null=True, upload_to=nameFile)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('-timestamp',)

class MessageToGroup(models.Model):
    sender = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='sender_group')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='group_message')
    message = models.CharField(max_length=1200)
    img = models.ImageField(blank=True, null=True, upload_to=nameFile)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('-timestamp',)
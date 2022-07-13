
from accounts.models import Person
from accounts.serializers import UserSerializer
from servis.models import Group
from rest_framework import serializers
from chat.models import Message, MessageToGroup

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Person.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Person.objects.all())

    class Meta:
        model = Message
        fields = ["id", 'sender', 'receiver', 'message', "image", 'timestamp', "is_read"]

    def create(self, validated_data):
        
        user = Message.objects.create(**validated_data)

        return user

class MessageToGroupSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Person.objects.all())
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())

    class Meta:
        model = MessageToGroup
        fields = ["id",'sender', 'group', 'message', "image", 'timestamp', "is_read"]

    def create(self, validated_data):
        
        user = MessageToGroup.objects.create(**validated_data)

        return user
    
class MessageToGroupSerializerToGet(serializers.ModelSerializer):
    sender = UserSerializer()
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())

    class Meta:
        model = MessageToGroup
        fields = ["id",'sender', 'group', 'message', "image", 'timestamp']

    def create(self, validated_data):
        
        user = MessageToGroup.objects.create(**validated_data)

        return user
# class SmallLastMessage(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = ['sender', 'receiver', 'message', 'timestamp',"is_read"]

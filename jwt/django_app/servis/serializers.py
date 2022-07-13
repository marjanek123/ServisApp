from rest_framework import serializers
from .models import Members, Group, Clients, Event, MagicCode, Stove, Work
from accounts.models import Person
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.response import Response
from rest_framework.request import clone_request
from accounts.serializers import UserSerializer

class StoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stove
        fields = ["id","name", "group"]

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id","name", "about"]

class MembersSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ["id", "person", "date_joined",
                  "permissions", "group", "person",]
        read_only_fields = ["person", "date_joined", "group"]
        # depth  = 1
    def update(self, instance, validated_data):
            instance.permissions = validated_data.get(
                'permissions', instance.permissions)
            instance.save()
            return instance
class MembersSerializer(serializers.ModelSerializer):
    person = UserSerializer()
    group = GroupSerializer(many=False)
    
    class Meta:
        model = Members
        fields = ["id","person", "date_joined", "group",
                  "permissions"]
        read_only_fields = ["person", "date_joined", "group"]
        # depth  = 1

    

class ChatListSerializer(serializers.ModelSerializer):
    person = UserSerializer()
    group = GroupSerializer(many=False)
    new_message = serializers.BooleanField(default=False)

    class Meta:
        model = Members
        fields = ["id", "person", "date_joined",
                  "permissions", "group","person","new_message"]
        read_only_fields = ["person", "date_joined", "group"]
        # depth  = 1

    def update(self, instance, validated_data):
        instance.permissions = validated_data.get(
            'permissions', instance.permissions)
        instance.save()
        return instance

class AddMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = "__all__"


class JoinMembersSerializer(serializers.ModelSerializer):
    person = UserSerializer(many=False)
    group = GroupSerializer(many=False)
    is_accepted = serializers.BooleanField(default=True)

    class Meta:
        model = Members
        fields = ["id", "is_accepted","person","group"]
        read_only_fields = ["group","person"]
    


    def update(self, instance, validated_data):
        instance.is_accepted = validated_data.get(
            'is_accepted', instance.is_accepted)
        instance.save()
        return instance




class JoinGroupSerializer(serializers.ModelSerializer):
    members = JoinMembersSerializer(many=True)

    class Meta:
        model = Group
        fields = ["person",  "members"]


class ClientsDetailSerializer(serializers.ModelSerializer):
    stove = StoveSerializer()
    
    class Meta:
        model = Clients
        fields = ["id","first_name","stove" ,"town","street","nr_house","group", "tel"]
        read_only_fields = ["group"]

        def update(self, instance, validated_data):
            instance.first_name = validated_data.get(
                'first_name', instance.first_name)
            instance.town=validated_data.get("town",instance.town)
            instance.street=validated_data.get("street",instance.street)
            instance.nr_house=validated_data.get("nr_house",instance.nr_house)
            
            instance.save()
            return instance

            
class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = ["id","first_name","stove","town","street","nr_house","group", "tel"]
       
class ClientsSerializerToGet(serializers.ModelSerializer):
    stove = StoveSerializer()
    class Meta:
        model = Clients
        fields = ["id","first_name","stove","town","street","nr_house","group", "tel"]
        

        

    # def create(self, validated_data):
    #     client = Clients.objects.create_client(validated_data["first_name"], validated_data["second_name"], validated_data["kod_pocztowy"],
    #                                            validated_data["town"], validated_data["street"], validated_data["nr_house"], validated_data["group"])
    #     return client

# class EventSerializer2(serializers.ModelSerializer):
#     # data_wizyty = serializers.SlugField()
#     # group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())
#     class Meta:
#         model = Event
#         fields = ["id","client","group","servisant","created_at","updated_at","data_wizyty","godzina_wizyty","description", "bussy"]

#     def create(self, validated_data):
#         client_data = validated_data.pop('client')
#         servisant_data = validated_data.pop('servisant')
#         client = Clients.objects.get(id = client_data)
#         servisant = Members.objects.get(id = servisant_data)
#         obj  = Event.objects.create(client=client, servisant=servisant, **validated_data)
#         return obj

class EventSerializerToGet(serializers.ModelSerializer):
    # data_wizyty = serializers.SlugField()
    # servisant = MembersSerializer()
    servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    client = ClientsSerializerToGet()
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())
    # client = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Clients.objects.all())
    # servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    # servisant = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # client = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    class Meta:
        model = Event
        fields = ["id","client","group","servisant","created_at","updated_at","data_wizyty","godzina_wizyty2","godzina_wizyty","description", "bussy", "done"]

class EventSerializerToEvents(serializers.ModelSerializer):
    # data_wizyty = serializers.SlugField()
    servisant = MembersSerializer()
    # servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    # client = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Clients.objects.all())
    # servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    # servisant = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # client = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    class Meta:
        model = Event
        fields = ["id","servisant","created_at","updated_at","data_wizyty","godzina_wizyty2" ,"godzina_wizyty","description", "bussy", "done"]
        depth = 2

class EventSerializer(serializers.ModelSerializer):
    # data_wizyty = serializers.SlugField()
    # servisant = MembersSerializer()
    # client = ClientsSerializer()
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())
    # client = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Clients.objects.all())
    servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    # servisant = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # client = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    class Meta:
        model = Event
        fields = ["id","client","group","servisant","created_at","updated_at","data_wizyty","godzina_wizyty2" ,"godzina_wizyty","description", "bussy", "done"]
        
    def update(self, instance, validated_data):
            instance.client = validated_data.get(
                'client', instance.client)
            instance.servisant=validated_data.get("servisant",instance.servisant)
            instance.godzina_wizyty=validated_data.get("godzina_wizyty",instance.godzina_wizyty)
            instance.godzina_wizyty2=validated_data.get("godzina_wizyty2",instance.godzina_wizyty2)
            instance.description=validated_data.get("description",instance.description)
            instance.bussy=validated_data.get("bussy",instance.bussy)
            instance.done=validated_data.get("done",instance.done)
            
            instance.save()
            return instance
    # def create(self, validated_data):
    #     servisant_data = validated_data['servisant']
    #     client_data = validated_data['client']
    #     client = Clients.objects.get(pk = client_data)
    #     servisant = Members.objects.get(pk = servisant_data)
    #     # cl = validated_data.data["client"] = client.data
    #     # sr = validated_data.data["servisant"] = servisant.data
    #     # print(request.data)
    #     # client_data = validated_data.pop('client')
    #     # servisant_data = validated_data.pop('servisant')
    #     # client = Clients.objects.get(id = client_data)
    #     # servisant = Members.objects.get(id = servisant_data)
    #     obj  = Event.objects.create(client=client, servisant=servisant, **validated_data)
    #     return obj

class WorkSerializer(serializers.ModelSerializer):
    servisant = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Members.objects.all())
    event = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Event.objects.all())
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())

    class Meta:
        model = Work
        fields = ["id", "event" , "group", "servisant", "created_at", "description_work", "done"]

class WorkSerializerToGet(serializers.ModelSerializer):
    servisant = MembersSerializer()
    group = serializers.SlugRelatedField(many=False, slug_field='id', queryset=Group.objects.all())
    event = EventSerializerToGet()
    
    class Meta:
        model = Work
        fields = ["id", "event" , "group", "servisant", "created_at", "description_work", "done"]

class MagicCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagicCode
        fields = "__all__"


    

##########3cosutm###############

# class InviteSerializer(serializers.Serializer):
#     code = serializers.CharField()


class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "about", "person"]


# class AddMemberToGroupByCode(serializers.Serializer):
#     code = serializers.CharField()

#     def create(self, validated_data):
#         user = Members.objects.create_member(
#             validated_data['person'], validated_data['group'])

#         return user

class AddMemberSerializer(serializers.Serializer):
    group = serializers.CharField()
    person = serializers.CharField()

    def create(self, validated_data):
        user = Members.objects.create_member(
            validated_data['person'], validated_data['group'])

        return user

class AutomaticAddAdminMemberSerializer(serializers.Serializer):
    person = serializers.CharField()
    is_accepted = serializers.BooleanField(default=True)

    def create(self, validated_data):
        user = Members.objects.create_admin_member(
            **validated_data)

        return user
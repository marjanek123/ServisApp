from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics, permissions
from rest_framework.response import Response
from accounts.models import Person
from accounts.serializers import UserSerializer, UserListSerializer
from servis.serializers import GroupSerializer
from servis.permissions import MemberInGroupPermission
from servis.models import Group
from servis.serializers import MembersSerializer, ChatListSerializer
from servis.models import Members
from .models import Message, MessageToGroup
from .serializers import MessageSerializer, MessageToGroupSerializer, MessageToGroupSerializerToGet
# Create your views here.
from servis.models import Members

class MessageViewForPc(generics.GenericAPIView):
    serializer_class = MessageSerializer
    queryset = Members.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request, sender, receiver, messagesInt):
        messages = Message.objects.filter(sender_id=receiver, receiver_id=sender, is_read=False)
        for message in messages:
            message.is_read = True
            message.save()
        return Response({
            'receiver': UserSerializer(Person.objects.get(id=receiver)).data,
            'messages': MessageSerializer( Message.objects.filter(sender_id=sender, receiver_id=receiver)|
                                Message.objects.filter(sender_id=receiver, receiver_id=sender),many=True).data[:messagesInt][:-1]})

    def post(self, request, sender=None, receiver=None, messagesInt=None, form=None):
        request.data._mutable=True
        request.data["sender"]=sender
        request.data["receiver"]=receiver
        request.data._mutable = False
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class MessageView(generics.GenericAPIView):
    serializer_class = MessageSerializer
    queryset = Members.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request, sender, receiver, messagesInt):
        messages = Message.objects.filter(sender_id=receiver, receiver_id=sender, is_read=False)
        for message in messages:
            message.is_read = True
            message.save()
        return Response({
            'receiver': UserSerializer(Person.objects.get(id=receiver)).data,
            'messages': MessageSerializer( Message.objects.filter(sender_id=sender, receiver_id=receiver)|
                                Message.objects.filter(sender_id=receiver, receiver_id=sender),many=True).data[:messagesInt][::-1]})

    def post(self, request, sender=None, receiver=None, messagesInt=None, form=None):
        # request.data._mutable=True
        request.data["sender"]=sender
        request.data["receiver"]=receiver
        # request.data._mutable = False
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class MessageGroupView(generics.GenericAPIView):
    serializer_class = MessageToGroupSerializer
    queryset = MessageToGroup.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request, group, messagesInt,  form=None):
        messages = MessageToGroup.objects.filter(group_id=group, is_read= False)
        for mess in messages:
            mess.is_read = True
            mess.save()
        return Response({
            'receiver': GroupSerializer(Group.objects.get(id=group)).data,
            'messages': MessageToGroupSerializerToGet(MessageToGroup.objects.filter(group_id=group), many=True).data[:messagesInt][::-1]})

    def post(self, request, group=None, messagesInt=None, form=None):
        # request.data._mutable=True
        request.data["sender"]=request.user.id
        request.data["group"]=group
        # request.data._mutable = False
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            mess = MessageToGroup.objects.get(id=serializer.data["id"])
            ser = MessageToGroupSerializerToGet(mess)
            return Response(ser.data, status=201)
        return Response(serializer.errors, status=400)

class ChatListView(generics.GenericAPIView):
    serializer_class = ChatListSerializer
    queryset = Members.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request,form=None):
        
        members = Members.objects.filter(group = request.user.personmembers.group, is_accepted = True).exclude(person = request.user)
        for member in members:
            messages = Message.objects.filter(sender_id=member.person.id, is_read=False)
            if(len(messages)>0):
                member.new_message = True
                member.save()
        # if(len(messages)>0):
        #     member["new_message"] = True
        serializer = ChatListSerializer(members, many=True)
        return Response(serializer.data)

class NewGroupMessageView(generics.GenericAPIView):
    serializer_class = MessageSerializer
    queryset = Members.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request, form=None):
        messages = MessageToGroup.objects.filter(receiver_id=request.user, is_read=False)
        if(len(messages)>0):
            return Response({"newmessage":True})
        else:
            return Response({"newmessage":False})


class NewMessageView(generics.GenericAPIView):
    serializer_class = MessageSerializer
    queryset = Members.objects.all()
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    def get(self, request, form=None):
        messages = Message.objects.filter(receiver_id=request.user, is_read=False)
        if(len(messages)>0):
            return Response({"newmessage":True})
        else:
            return Response({"newmessage":False})
        # member = Members.objects.filter(group = request.user.personmembers.group).exclude(person = request.user)
        # serializer = MembersSerializer(member, many=True)
        # return Response(serializer.data)
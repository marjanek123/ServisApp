from http import client
from logging import raiseExceptions
from multiprocessing import context
from urllib import request
import string
import random
from django.utils.safestring import mark_safe
from accounts.models import Person
from django.http import Http404
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status, viewsets
from rest_framework.request import clone_request
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import timedelta, datetime, date
from accounts.serializers import UserSerializer, UserListSerializer
import calendar
from .utilits import MyCalendar
from .models import (Clients, Event, Group, MagicCode, Members, Stove, Work,
                     generate_unique_code)
from .serializers import (AddMemberSerializer,
                          ClientsDetailSerializer, ClientsSerializer,
                          CreateGroupSerializer, EventSerializer,
                          GroupSerializer, JoinGroupSerializer,
                          JoinMembersSerializer, MagicCodeSerializer,
                          MembersSerializer, MembersSerializer2, EventSerializerToGet,AutomaticAddAdminMemberSerializer, 
                          StoveSerializer,ClientsSerializerToGet, EventSerializerToEvents, WorkSerializer, WorkSerializerToGet)
from rest_framework.pagination import PageNumberPagination
from .permissions import MemberInGroupPermission, AdminGroupPermissions
days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
def get_date(req_day):
    if req_day:
        year, month = (int(x) for x in req_day.split("-"))
        return date(year, month, day=1)
    return datetime.today()

def prev_month(d):
    first = d.replace(day=1)
    prev_month = first - timedelta(days=1)
    month = "month=" + str(prev_month.year) + "-" + str(prev_month.month)
    return month

def getDateFromWeek(year, week, day=0):

    year_start = date(year,1,1)
    ys_weekday =  year_start.weekday()
    delta = (week*7)+(day-ys_weekday)
    if ys_weekday<4:
        delta -= 7
    result = year_start  + timedelta(days=delta)
    return  "{}".format(result)

def next_month(d):
    days_in_month = calendar.monthrange(d.year, d.month)[1]
    last = d.replace(day=days_in_month)
    next_month = last + timedelta(days=1)
    month = "month=" + str(next_month.year) + "-" + str(next_month.month)
    return month


# class MemberViewList(generics.ListAPIView):
#     serializer_class = MembersSerializer

#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly,
#     ]
#     def get(self, request, format=None):
#         print(self.request.user.objects.all())
#         queryset = self.request.user.objects.all
#         serializer = MembersSerializer(queryset, many=True)
#         return Response(serializer.data)

class GetUserMember(generics.GenericAPIView):
    serializer_class = MembersSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly & MemberInGroupPermission
    ]
    def get(self, request, format=None):
        queryset = Members.objects.get(person = request.user)
        serializer = MembersSerializer(queryset, many=False)
        return Response(serializer.data)


class MemberViewList(generics.ListAPIView):
    serializer_class = MembersSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly & MemberInGroupPermission
    ]


    def get_queryset(self, group, user):
        return Members.objects.get_all_members(group, user)

    def get(self, request, format=None):
        queryset = self.get_queryset(request.user.personmembers.group, request.user)
        serializer = MembersSerializer(queryset, many=True)
        return Response(serializer.data)


class MemberViewDetail(generics.GenericAPIView):
    serializer_class = MembersSerializer
    permission_classes = [
        permissions.IsAuthenticated&AdminGroupPermissions&MemberInGroupPermission
    ]

    def get_queryset(self, pk):
        try:
            return Members.objects.get(pk=pk)
        except Members.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        member = self.get_queryset(pk)
        self.check_object_permissions(request, member)
        serializer = MembersSerializer(member)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        member = self.get_queryset(pk)
        self.check_object_permissions(request, member)
        serializer = MembersSerializer2(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            obj = self.get_queryset(serializer.data["id"])
            ser = MembersSerializer(obj)
            return Response(ser.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_queryset(pk)
        self.check_object_permissions(request, snippet)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ClientsViewList(generics.ListAPIView):
    serializer_class = ClientsSerializerToGet

    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields  = ['^first_name',"^town", "^street"]

    # def get(self, request, format=None):
    #     queryset = Clients.objects.get_all_clients_group(self.request.user.personmembers.group)
    #     serializer = ClientsSerializerToGet(queryset, many=True)
    #     return Response(serializer.data,  status=status.HTTP_200_OK)

    def get_queryset(self):
        return Clients.objects.get_all_clients_group(self.request.user.personmembers.group)


    def post(self, request, format=None):

        request.data["group"] = request.user.personmembers.group.id
        serializer = ClientsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ClientsViewDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ClientsDetailSerializer
    # queryset = Clients.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]

    # def get_queryset(self, pk):
    #     try:
    #         return Clients.objects.get(pk=pk)
    #     except Event.DoesNotExist:
    #         raise Http404

    def get(self, request, pk,  form=None):
        client = Clients.objects.get(pk=pk)
        self.check_object_permissions(request, client)
        serializer = ClientsDetailSerializer(client)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        qr = Clients.objects.get(pk=pk)
        self.check_object_permissions(request, qr)
        request.data["group"] = request.user.personmembers.group.id
        serializer = ClientsSerializer(qr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            client = Clients.objects.get(id = serializer.data["id"])
            clientserializer = ClientsDetailSerializer(client)
            return Response(clientserializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupViewsets(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

class ClientsViewsets(viewsets.ModelViewSet):
    serializer_class = ClientsSerializer
    queryset = Clients.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission,
    ]


class EventViewsetse(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class StoveView(generics.ListCreateAPIView):
    serializer_class = StoveSerializer
    queryset = Event.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission,
    ]
    def post(self, request, form=None):
        request.data["group"] = request.user.personmembers.group.id
        serializer = StoveSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request, format=None):
        queryset = Stove.objects.filter(group = request.user.personmembers.group.id)
        serializer = StoveSerializer(queryset, many=True)
        return Response(serializer.data,  status=status.HTTP_200_OK)

class StoveViewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StoveSerializer
    queryset = Event.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission,
    ]

    def get(self, request, pk, format=None):
        queryset = Stove.objects.get(group = request.user.personmembers.group.id ,id=pk)
        serializer = StoveSerializer(queryset)
        return Response(serializer.data,  status=status.HTTP_200_OK)
    
    # def delete(self, request, pk , format=None):
    #     queryset = Stove.objects.get(group = request.user.personmembers.group.id ,id=pk)

class EventViewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    # queryset = Event.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission,
    ]
    def get_queryset(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk , form=None):
        queryset = self.get_queryset(pk)
        self.check_object_permissions(request, queryset)
        serializer = EventSerializerToGet(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        qr = self.get_queryset(pk)
        self.check_object_permissions(request, qr)
        request.data["group"] = request.user.personmembers.group.id
        serializer = EventSerializer(qr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            ser = self.get_queryset(serializer.data["id"])
            answer = EventSerializerToGet(ser)
            return Response(answer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_queryset(pk)
        self.check_object_permissions(request, snippet)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # def post(self, request, form=None):
    #     request.data["group"] = request.user.personmembers.group.id

        # serializer = EventSerializer(data=request.data)
        # if serializer.is_valid(raise_exception=False):done
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class EventsClientsView(generics.ListAPIView):
    serializer_class = EventSerializerToEvents
    # queryset=Event.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]

    def get_queryset(self, client):
        return Event.objects.get_last_client_events(client , self.request.user.personmembers.group.id)


    def get(self, request, client, form=None):
        queryset = self.get_queryset(client)
        serializer = EventSerializerToEvents(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventViewsets(generics.CreateAPIView):
    serializer_class = EventSerializerToGet
    # queryset = Event.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]

    def get(self, request, form=None):
        queryset = Event.objects.filter(person=request.user)
        serializer = CreateGroupSerializer(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, form=None):
        request.data["group"] = request.user.personmembers.group.id
        # ser = EventSerializer(data=request.data)
        events = Event.objects.filter(servisant = request.data["servisant"], data_wizyty = request.data["data_wizyty"], bussy = False)
        events2 = Event.objects.filter(servisant = request.data["servisant"], data_wizyty = request.data["data_wizyty"], bussy = True)
        if(len(events) > 0):
            return Response("error", status=status.HTTP_400_BAD_REQUEST)
        if( len(events2) > 0 and request.data["bussy"] == False):
            return Response("error", status=status.HTTP_400_BAD_REQUEST)
        # events = Event.objects.filter(servisant = request.user.personmembers.id, data_wizyty = request.data["data_wizyty"], bussy = True)
        # if(len(events) > 0 and ):
        #     return Response("error", status=status.HTTP_400_BAD_REQUEST)
        # client_data = request.data.pop("client")
        # servisant_data = request.data.pop("servisant")
        # client = Clients.objects.get(pk = client_data)
        # servisant = Members.objects.get(pk = servisant_data)
        # client_data = request.data['client']
        # servisant_data = request.data['servisant'] 
        # client = ClientsSerializer( Clients.objects.get(id = client_data))
        # servisant = MembersSerializer( Members.objects.get(id = servisant_data))
        # request.data["client"] = client.data
        # request.data["servisant"] = servisant.data
        # print(request.data)
        # request.save()
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            event = Event.objects.get(id = serializer.data["id"])
            eventserializer = EventSerializerToGet(event)
            return Response(eventserializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkViewList(generics.ListCreateAPIView):
    serializer_class = WorkSerializer
    # queryset = Work.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    def get(self, request, form=None):
        queryset = Work.objects.all_works(request.user.personmembers.group.id)
        serializer = WorkSerializerToGet(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request, form=None):
        request.data["group"]=request.user.personmembers.group.id
        serializer = WorkSerializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            event = Work.objects.get(id = serializer.data["id"])
            eventserializer = WorkSerializerToGet(event)
            return Response(eventserializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkViewListServisant(generics.ListAPIView):
    serializer_class = WorkSerializer
    # queryset = Work.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    def get(self, request, form=None):
        queryset = Work.objects.servisant_works(request.user.personmembers.group.id, request.user.personmembers.id)
        serializer = WorkSerializerToGet(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

class WorkViewDetail(generics.GenericAPIView):
    serializer_class = WorkSerializer
    # queryset = Work.objects.all()
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    def get_queryset(self, pk):
        try:
            return Work.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk,  form=None):
        queryset = self.get_queryset(pk)
        self.check_object_permissions(request, queryset)
        serializer = WorkSerializerToGet(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        qr = self.get_queryset( pk)
        self.check_object_permissions(request, qr)
        request.data["group"] = request.user.personmembers.group.id
        serializer = WorkSerializer(qr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            ser = self.get_queryset(serializer.data["id"])
            answer = WorkSerializerToGet(ser)
            return Response(answer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        work = self.get_queryset(pk)
        self.check_object_permissions(request, work)
        work.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

########################################################################
################### CREATING GROUP & ADDING MEMBERS ####################
########################################################################

class CreateGroupView(generics.ListCreateAPIView):
    serializer_class = CreateGroupSerializer
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]

    def post(self, request, form=None):
        request.data["person"] = request.user.id
        serializer = CreateGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, form=None):
        queryset = Group.objects.filter(person=request.user)
        serializer = CreateGroupSerializer(queryset , many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetGropByMember(generics.RetrieveAPIView):
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    def get(self, request,form=None):
        member = Members.objects.get(person = request.user, is_accepted=True)
        try:
            group = Group.objects.get(id=member.group.id)
            serializer = GroupSerializer(group)
            return Response(serializer.data)
        except Group.DoesNotExist:
            raise Response({"error": "group no Exist"},
                           status=status.HTTP_404_NOT_FOUND)


class GroupView(generics.RetrieveUpdateAPIView):
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]

    def get_object(self, user):
        try:
            return Group.objects.get(person=user)
        except:
            return Response({"error": "group no Exist"},
                           status=status.HTTP_404_NOT_FOUND)

    def get(self, request, form=None):
        group = self.get_object(request.user.id)
        print(group)
        serializer = GroupSerializer(group)
        print(serializer.data)
        return Response(serializer.data)

    def put(self, request, form=None):
        group = self.get_object(request.user.id)
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AutomticAddAdminMember(generics.GenericAPIView):
    serializer_class = AutomaticAddAdminMemberSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, form=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()
        return Response(MembersSerializer(member, context=self.get_serializer_context()).data,)


class AddMember(generics.GenericAPIView):
    serializer_class = AddMemberSerializer
    permission_classes = [
        permissions.IsAuthenticated&AdminGroupPermissions
    ]
    def post(self, request, form=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()
        return Response(MembersSerializer(member, context=self.get_serializer_context()).data,)


class JoinToGroupByUserList(generics.GenericAPIView):
    serializer_class = JoinMembersSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self, user):
        qr = Members.objects.filter(person=user)
        return qr

    def get(self, request, form=None):
        queryset = self.get_queryset(request.user.id)
        serilaizer = JoinMembersSerializer(queryset, many=True)
        print(serilaizer.data)
        return Response(serilaizer.data)


class JoinToGroupByUserDetail(generics.RetrieveUpdateAPIView):
    serializer_class = JoinMembersSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_object(self):
        qr = Members.objects.get(person=self.request.user)
        return qr

class CalendarView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated&MemberInGroupPermission
    ]
    serializer_class = EventSerializer
    
    def get(self, request, servisant, next_week, prev_week, *args, **kwargs):
        data = date.today()
        wk = data.isocalendar()
        events = Event.objects.filter(servisant_id = servisant, data_wizyty__week = (wk[1]+next_week-prev_week), data_wizyty__year=wk[0])
        return Response({
            "mon":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 1), many=True).data,
                "day":(getDateFromWeek(wk[0],wk[1]+next_week-prev_week,0) )
            },
            "tue":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 2), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,1)
            },
            "wed":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 3), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,2)
            },
            "thu":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 4), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,3)
            },
            "fri":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 5), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,4)
            },
            "sat":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 6), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,5)
            },
            "sun":{
                "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 7), many=True).data,
                "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,6)
            }
        })

    
    
class DailyCalendarView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated & MemberInGroupPermission
    ]
    serializer_class = EventSerializer
    day = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"]

    def get(self, request, *args, **kwargs):
        data = date.today()
        wk = data.isocalendar()
        events = Event.objects.filter(servisant_id = request.user.personmembers.id, data_wizyty__year=wk[0])
        if wk[2] < 6:
            return Response({
                "format_day":{
                    "events": EventSerializerToGet(events.filter(data_wizyty__iso_week_day = wk[2], data_wizyty__week = (wk[1])) , many=True).data,
                    "day":(getDateFromWeek(wk[0],wk[1],wk[2]-1) , self.day[wk[2]-1])
                }
            })
        else:
            return Response({
                "format_day":{
                    "events": EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 1, data_wizyty__week = (wk[1]+1)), many=True).data,
                    "day":(getDateFromWeek(wk[0],wk[1]+1,0) ,self.day[0])
                }
            })
            # return Response({
        #     "mon":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 1), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,0) 
        #     },
        #     "tue":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 2), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,1)
        #     },
        #     "wed":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 3), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,2)
        #     },
        #     "thu":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 4), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,3)
        #     },
        #     "fri":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 5), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,4)
        #     },
        #     "sat":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 6), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,5)
        #     },
        #     "sun":{
        #         "events":EventSerializerToGet(events.filter(data_wizyty__iso_week_day = 7), many=True).data,
        #         "day":getDateFromWeek(wk[0],wk[1]+next_week-prev_week,6)
        #     }
        # })

    
    
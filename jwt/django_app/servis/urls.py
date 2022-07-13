
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AddMember, MemberViewList,AutomticAddAdminMember, GroupViewsets, ClientsViewsets, EventViewsetse,EventsClientsView, EventViewDetail,EventViewsets, CreateGroupView, GroupView, JoinToGroupByUserList, JoinToGroupByUserDetail, MemberViewDetail, ClientsViewList,ClientsViewDetail,GetGropByMember, CalendarView, DailyCalendarView, GetUserMember, StoveView, StoveViewDetail, WorkViewDetail, WorkViewList, WorkViewListServisant

router = DefaultRouter()
# router.register(r'members', MemberViewsets, "api")
# router.register(r'code', MagicCodeView,"magiccode")
router.register(r'group', GroupViewsets)
router.register(r'clients', ClientsViewsets)
# router.register(r'visits', EventViewsetse)
# jointogrouprouter = DefaultRouter()
# jointogrouprouter.register(r"invite-list", JoinToGroupByUser, "servis")
# grouporcode = DefaultRouter()
# grouporcode.register(r"code", MagicCodeView)
# grouporcode.register(r"creategroup", CreateGroupView)


urlpatterns = [
    # path("create", include(grouporcode.urls)),
    path('', include(router.urls)),
    # path("groupe/", JoinGroupView.as_view()),
    # path("code/", MagicCodeView.as_view(), name='code'),
    path("calendar/<int:servisant>/<int:next_week>/<int:prev_week>/", CalendarView.as_view(), name="calendar"),
    path("calendar/daily/", DailyCalendarView.as_view(), name="calendardaily"),
    path("create-group/", CreateGroupView.as_view(), name="groupcreate"),
    path('invite-user/', AddMember.as_view(), name="inviteuser"),
    path('invite-admin-to-group/', AutomticAddAdminMember.as_view(), name="inviteadmintogroup"),
    path("get-group/", GroupView.as_view(), name="getgroup"),
    path("get-groupbymember/", GetGropByMember.as_view(), name="getgroupbymember"),
    path("invite-list/", JoinToGroupByUserList.as_view(), name="invitelist"),
    path("invite-detail/<int:pk>/",
         JoinToGroupByUserDetail.as_view(), name="invitedetail"),
    path("member-list/", MemberViewList.as_view(), name="memberlist"),
    path("member-user/", GetUserMember.as_view(), name="memberuser"),
    path("member-detail/<int:pk>/",
         MemberViewDetail.as_view(), name="memberdetail"),
    path("clients-list/", ClientsViewList.as_view(), name="clientslist"),
    path("clients-events/<int:client>/", EventsClientsView.as_view(), name="clientsevents"),
    path("clients-detail/<int:pk>/", ClientsViewDetail.as_view(), name="clientsdetail"),

    path("stove-list/", StoveView.as_view(), name="stovelist"),
    path("stove-detail/<int:pk>/", StoveViewDetail.as_view(), name="stovelist"),

    path("visits-list/", EventViewsets.as_view(), name="eventslist"),
    path("visits-detail/<int:pk>/", EventViewDetail.as_view(), name="eventsdetail"),

    path("work-list/", WorkViewList.as_view(), name="worklist"),
    path("work-list-servisant/", WorkViewListServisant.as_view(), name="worklistservisant"),
    path("work-detail/<int:pk>/", WorkViewDetail.as_view(), name="workdetail"),
    # path("clients-detail/<int:pk>/", ClientsViewDetail.as_view(), name="clientsdetail"),
#     path("cli/", ExampleClientsViewList.as_view())
    # # path("invite/", include(jointogrouprouter.urls))
]

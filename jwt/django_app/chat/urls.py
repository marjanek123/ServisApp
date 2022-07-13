from django.urls import path, include
from .views import MessageView, ChatListView, NewMessageView, MessageViewForPc, MessageGroupView

urlpatterns = [
    path('messages/<int:sender>/<int:receiver>/<int:messagesInt>/', MessageView.as_view(), name='messages'),
    path('messages-group/<int:group>/<int:messagesInt>/', MessageGroupView.as_view(), name='messages-group'),
    path('messages-Pc/<int:sender>/<int:receiver>/<int:messagesInt>/', MessageViewForPc.as_view(), name='messages'),
    path('chat-list/', ChatListView.as_view(), name='chatlist'),
    path('chat-newmessage/', NewMessageView.as_view(), name='newmessage'),

]


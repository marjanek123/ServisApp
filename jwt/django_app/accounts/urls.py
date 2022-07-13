from knox import views as knox_views
from .views import LoginAPI
from .views import RegisterAPI, UserApi, UsersList
from django.urls import path

urlpatterns = [
    path('api/userlist/', UsersList.as_view(), name='userlist'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/user/', UserApi.as_view(), name='user'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    # path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]

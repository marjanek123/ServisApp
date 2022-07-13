from logging import raiseExceptions
from rest_framework.permissions import BasePermission, SAFE_METHODS


class MemberInGroupPermission(BasePermission):
    message ="no allowed"
    # def has_permission(self, request, view):
    #     return False


    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in SAFE_METHODS:
        #     return True

        # Instance must have an attribute named `owner`.
        try:
            return bool(obj.group == request.user.personmembers.group )
        except: 
            return False

class AdminGroupPermissions(BasePermission):

    message ="no allowed"
    # def has_permission(self, request, view):
    #     return False
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in SAFE_METHODS:
        #     return True

        # Instance must have an attribute named `owner`.
        return bool(obj.group == request.user.group)


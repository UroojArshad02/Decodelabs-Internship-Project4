from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):

    def has_permission(self, request, view):

        # GET requests are allowed for authenticated users
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # POST and PUT require admin
        return request.user and request.user.is_staff
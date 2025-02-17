from rest_framework import authentication
from rest_framework import exceptions
from users.models import User
from rest_framework.authentication import BasicAuthentication


class KPtubeAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        us = request.META.get('HTTP_X_USERNAME')
        pas = request.META.get('HTTP_X_PASSWORD')
        if not us and not pas:
            return None

        try:
            user = User.objects.get(name=us, password=pas)
        except:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
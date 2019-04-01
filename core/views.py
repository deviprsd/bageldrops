from django.shortcuts import render
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def index(request):
    if settings.DEBUG:
        return render(request, 'core/frontend-dev.html')
    else:
        return render(request, 'core/frontend-prod.html')


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['firstName'] = self.user.first_name
        data['lastName'] = self.user.last_name
        data['email'] = self.user.email

        return data


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

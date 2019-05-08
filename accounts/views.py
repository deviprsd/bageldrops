from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.decorators import permission_classes


@permission_classes((permissions.AllowAny,))
class UserCreate(APIView):
    queryset = User.objects.all()

    def post(self, request):
        """
        function for registering new users
        :param request:
        :return:
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

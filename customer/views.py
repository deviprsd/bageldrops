from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from customer.serializers import CustomerSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.decorators import permission_classes



class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

@permission_classes((permissions.AllowAny,))
class UserCreate(APIView):
    queryset = Customer.objects.all()

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            print('serializer valid')
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        print('serializer may be invalid')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

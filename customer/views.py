from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import CustomerSerializer
from accounts.serializers import UserSerializer
from .models import Customer
from rest_framework.response import Response


# creates customer queryset and serializer class
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def partial_update(self, request, *args, **kwargs):
        """
        for PATCH requests
        Updates specified user fields if user exists
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        user_data, customer_data = {}, {}
        for key, value in request.data.items():
            if key in ['first_name', 'last_name', 'email']:
                user_data[key] = value

        for key, value in request.data.items():
            if key in ['cart', 'billing']:
                customer_data[key] = value

        if customer_data:
            customer_instance = self.get_object()
            customer_serializer = self.get_serializer(customer_instance, data=customer_data, partial=True)
            if customer_serializer.is_valid():
                self.perform_update(customer_serializer)

                if getattr(customer_instance, '_prefetched_objects_cache', None):
                    customer_instance._prefetched_objects_cache = {}

        if user_data:
            user_instance = self.get_object().user
            user_serializer = UserSerializer(user_instance, data=user_data, partial=True)
            if user_serializer.is_valid():
                self.perform_update(user_serializer)

                if getattr(user_instance, '_prefetched_objects_cache', None):
                    user_instance._prefetched_objects_cache = {}

        return Response(self.get_serializer(self.get_object()).data)

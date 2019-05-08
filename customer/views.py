from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer
from rest_framework.response import Response


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def partial_update(self, request, *args, **kwargs):
        user_data, customer_data = {}, {}
        for key, value in request.data.items():
            if key in ['first_name', 'last_name', 'email']:
                user_data[key] = value

        for key, value in request.data.items():
            if key in ['cart', 'billing']:
                customer_data[key] = value

        customer_instance = self.get_object()
        customer_serializer = self.get_serializer(customer_instance, data=customer_data, partial=True)
        if customer_serializer.is_valid():
            self.perform_update(customer_serializer)

            if getattr(customer_instance, '_prefetched_objects_cache', None):
                customer_instance._prefetched_objects_cache = {}

        user_instance = customer_instance.user
        user_serializer = self.get_serializer(user_instance, data=user_data, partial=True)
        if user_serializer.is_valid():
            self.perform_update(user_serializer)

            if getattr(user_instance, '_prefetched_objects_cache', None):
                user_instance._prefetched_objects_cache = {}

        return Response(customer_serializer.data)

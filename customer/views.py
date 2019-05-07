from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer
from rest_framework.response import Response
from rest_framework import status


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        print('args create: ', args)
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            if customer:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        print('args partial_update: ', args)
        serializer = CustomerSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            customer = serializer.save()
            if customer:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        pass

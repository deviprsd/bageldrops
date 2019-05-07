from rest_framework import viewsets
from .serializers import AddressSerializer
from .models import Address


class BillingViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

from rest_framework import viewsets
from .serializers import AddressSerializer
from .models import Address


# sets queryset and serializer class
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

from rest_framework import viewsets
from .serializers import CartSerializer
from .models import Cart


# creates queryset and serializer
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

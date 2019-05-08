from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product


# creates product queryset and serializer class
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

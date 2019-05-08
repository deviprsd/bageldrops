from rest_framework import viewsets
from .serializers import TaxSerializer
from .models import Tax


# creates tax queryset and serializer class
class TaxViewSet(viewsets.ModelViewSet):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer

from rest_framework import viewsets
from .serializers import CollectionSerializer
from .models import Collection


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

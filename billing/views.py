from rest_framework import viewsets
from .serializers import BillingSerializer
from .models import Billing


# sets queryset and serializer class
class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

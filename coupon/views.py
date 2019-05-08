from rest_framework import viewsets
from .serializers import CouponSerializer
from .models import Coupon


# sets coupon serializer class and queryset
class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

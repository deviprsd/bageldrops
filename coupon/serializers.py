from rest_framework import serializers
from .models import Coupon


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = (
            'cp_code', 'dis_type', 'discount', 'min_prod',
            'dis_strategy', 'dis_strategy_split', 'limit',
            'exp_date'
        )
        read_only_fields = fields

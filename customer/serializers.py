from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'customer_id', 'user', 'billing_info', 'carts'
        )
        read_only_fields = fields

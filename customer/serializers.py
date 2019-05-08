from rest_framework import serializers
from .models import Customer


# sets customer fields from front end
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'customer_id', 'user', 'billing', 'carts'
        )
        read_only_fields = fields

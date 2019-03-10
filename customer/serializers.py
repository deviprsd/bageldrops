from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'password', 'name', 'delivery_address', 'billing_address',
            'card_number', 'card_exp_date', 'sec_code'
        )
        read_only_fields = 'email'

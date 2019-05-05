from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'customer_id', 'username', 'email', 'password', 'first_name', 'last_name', 'billing_info', 'carts'
        )
        #read_only_fields = ('email')

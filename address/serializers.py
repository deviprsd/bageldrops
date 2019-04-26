from rest_framework import serializers
from .models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('billing_address', 'delivery_address', 'card_number', 'card_security_code', 'card_exp_data')
        read_only_fields = fields

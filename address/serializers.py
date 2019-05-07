from rest_framework import serializers
from .models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('street_one', 'street_two', 'city', 'state',
                  'zip', 'country')
        read_only_fields = fields

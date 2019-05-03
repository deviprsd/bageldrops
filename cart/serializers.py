from rest_framework import serializers
from .models import Cart


# sets cart fields
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = (
            'cart_state', 'cart_billing', 'products'
        )
        read_only_fields = fields

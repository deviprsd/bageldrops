from rest_framework import serializers
from .models import Cart


# sets cart fields to be used by front end
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('cart_state', 'cart_billing', 'products', 'subtotal', 'total', 'products')
        read_only_fields = fields

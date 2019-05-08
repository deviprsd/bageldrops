from rest_framework import serializers
from .models import Cart


# sets cart fields to be used by front end
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'cart_id', 'cart_state', 'cart_billing', 'products', 'subtotal', 'total', 'products', 'customer', 'quantities')

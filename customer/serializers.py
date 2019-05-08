from rest_framework import serializers
from .models import Customer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


# sets customer fields from front end
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'customer_id', 'user', 'billing', 'carts'
        )
        read_only_fields = fields

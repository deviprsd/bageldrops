from rest_framework import serializers
from .models import Product


# creates product fields
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'prod_name', 'price', 'prod_id',
            'prod_category', 'stock', 'limit', 'crt_date'
        )
        read_only_fields = fields

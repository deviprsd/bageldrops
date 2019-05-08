from rest_framework import serializers
from .models import Product


# sets product fields for front end
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'prod_name', 'price', 'prod_id', 'images',
            'prod_category', 'stock', 'limit', 'crt_date',
        )
        read_only_fields = fields

from rest_framework import serializers
from .models import Collection


class CollectionSerializer(serializers.ModelSerializer):
    products = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='prod_id'
    )

    class Meta:
        model = Collection
        fields = (
            'category', 'is_active', 'products'
        )
        read_only_fields = fields

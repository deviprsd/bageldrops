from rest_framework import serializers
from .models import Tax


class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ['tax_rate']
        read_only_fields = fields

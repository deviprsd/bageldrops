from rest_framework import serializers
from .models import Tax


# sets tax rate field for front end
class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ('state', 'tax_rate')
        read_only_fields = fields

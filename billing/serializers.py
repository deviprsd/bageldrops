from rest_framework import serializers
from .models import Billing


# sets read only fields for billing
class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = ('billing_address', 'delivery_address', 'card_number', 'card_security_code', 'card_exp_data')
        read_only_fields = fields

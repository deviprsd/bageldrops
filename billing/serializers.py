from rest_framework import serializers
from .models import Billing


# sets billing fields to be used by front end
class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = ('billing_address', 'delivery_address', 'card_number',
                  'card_security_code', 'card_exp_date', 'customer')
        read_only_fields = fields

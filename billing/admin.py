from django.contrib import admin
from .models import Billing


@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ('billing_address', 'delivery_address', 'card_number', 'card_security_code', 'card_exp_data')

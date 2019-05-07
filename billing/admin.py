from django.contrib import admin
from .models import Billing


# registers billing and appropriate fields in admin
@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ('billing_address', 'delivery_address', 'card_number', 'card_security_code', 'card_exp_date')
    readonly_fields = ('crt_date', 'mdf_date')

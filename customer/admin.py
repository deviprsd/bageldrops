from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('password', 'name', 'delivery_address', 'billing_address','card_number', 'card_exp_date', 'sec_code')


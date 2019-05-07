from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'user', 'billing_info', 'carts')
    readonly_fields = ('crt_date', 'mdf_date')

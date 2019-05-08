from django.contrib import admin
from .models import Cart


# registers cart and appropriate fields in admin
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('cart_id', 'cart_state', 'customer', 'cart_billing', 'subtotal', 'total')
    readonly_fields = ('crt_date', 'mdf_date')


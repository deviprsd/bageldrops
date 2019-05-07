from django.contrib import admin
from .models import Cart


# registers cart and appropriate fields in admin
# creation date and modify date represent read-only fields
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('cart_state', 'cart_billing', 'products', 'subtotal', 'total')
    readonly_fields = ('crt_date', 'mdf_date')


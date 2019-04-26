from django.contrib import admin
from .models import Cart


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('cart_state', 'cart_billing', 'products')
    readonly_fields = ('crt_date', 'mdf_date')


from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'prod_name', 'price', 'prod_id', 'prod_category', 'stock', 'limit',
        'crt_date'
    )

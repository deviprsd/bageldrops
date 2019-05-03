from django.contrib import admin
from .models import Product


# registers product fields in admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'prod_name', 'price', 'prod_id', 'prod_category', 'stock', 'limit',
        'crt_date'
    )
    readonly_fields = ('crt_date', 'mdf_date')

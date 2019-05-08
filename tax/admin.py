from django.contrib import admin
from .models import Tax


# registers tax rate with admin
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ['tax_rate']

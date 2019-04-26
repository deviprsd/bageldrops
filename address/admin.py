from django.contrib import admin
from .models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street_one', 'street_two', 'city', 'state', 'zip')
    readonly_fields = ('crt_date', 'mdf_date')

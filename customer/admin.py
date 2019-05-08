from django.contrib import admin
from .models import Customer


# register customer fields with admin
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'user')
    readonly_fields = ('crt_date', 'mdf_date')

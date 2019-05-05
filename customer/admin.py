from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'username', 'email', 'password', 'first_name', 'last_name', 'billing_info', 'carts')


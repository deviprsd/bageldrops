from django.contrib import admin
from .models import Coupon


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('cp_code', 'dis_type', 'discount', 'min_prod', 'limit')

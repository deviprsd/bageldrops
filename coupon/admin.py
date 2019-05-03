from django.contrib import admin
from .models import Coupon


# registers coupon fields with admin
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('cp_code', 'dis_type', 'discount', 'min_prod', 'limit', 'crt_date', 'exp_date')
    readonly_fields = ('crt_date', 'mdf_date')

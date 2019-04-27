from django.contrib import admin
from .models import Collection


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('category', 'is_active')
    readonly_fields = ('crt_date', 'mdf_date')

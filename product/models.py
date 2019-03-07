from django.db import models
from django.utils import timezone
from django.core.validators import validate_comma_separated_integer_list
from enum import IntEnum

class ProdCategories(Enum):
    CLOTHING = "Clothing/ Shoes/ Accessories"
    MEDIA = "Books/ Movies/ TV Shows/ Music"
    ELECTRONICS = "Electronic Devices/ Accessories"
    MISC = "Misc"

class Product(models.Model):
    prod_name = models.CharField('product name', max_length = 50)
    price_dollars = models.SmallIntegerField('dollars', default = 0)
    price_cents = models.SmallIntegerField('cents', default = 0)
    prod_id = models.CharField('product ID', max_length = 5)
    prod_category = models.CharField(
        'product category',
        choices = [(x.name, x.value) for x in ProdCategories],
        default = ProdCategories.MISC,
        max_length = 11
    )
    stock = models.IntegerField('number of product in stock', default = 1)
    limit = models.IntegerField('max number of product per order')
    crt_data = models.DateTimeField('created date', default = timezone.now)


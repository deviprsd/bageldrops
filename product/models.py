from django.db import models
from django.utils import timezone
from enum import Enum


class ProdCategories(Enum):
    CLOTHING = "Clothing/ Shoes/ Accessories"
    MEDIA = "Books/ Movies/ TV Shows/ Music"
    ELECTRONICS = "Electronic Devices/ Accessories"
    MISC = "Misc"


class Product(models.Model):
    prod_name = models.CharField('product name', max_length=50)
    price = models.FloatField('price', default=0.00)
    prod_id = models.CharField('product ID', max_length=5)
    prod_category = models.CharField(
        'product category',
        choices=[(x.name, x.value) for x in ProdCategories],
        default=ProdCategories.MISC,
        max_length=11
    )
    stock = models.IntegerField('number of product in stock', default=1)
    limit = models.IntegerField('max number of product per order')
    crt_date = models.DateTimeField('created date', default=timezone.now)
    # modified_date = models.DateTimeField('date last')


def __str__(self):
    return "{}".format(self.prod_name)

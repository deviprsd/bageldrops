from django.db import models
from django.utils import timezone
from django.core.validators import validate_comma_separated_integer_list
from enum import IntEnum

class Product(models.Model):
    prod_name = models.CharField('product name', max_length = 50)
    price_dollars = models.SmallIntegerField('dollars', default = 0)
    price_cents = models.SmallIntegerField('cents', default = 0)
    prod_id = models.CharField('ID', max_length = 10)

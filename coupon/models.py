from django.core.validators import validate_comma_separated_integer_list
from django.db import models
from enum import Enum
from django.utils import timezone


class DisTypes(Enum):
    PERCENT = "Pecentage based discount"
    CASH = "Cash based discount"


class DisStrategies(Enum):
    BOGO = "Buy one Get one"  # buy one get one
    BMDR = "Buy multiple Get Discount on Rest"  # buy multiple get discount on rest
    DEFA = "Apply Discount to Everything"  # apply discount to everything


class Coupon(models.Model):
    cp_code = models.CharField('coupon code', max_length=15)
    dis_type = models.CharField(
        'discount type',
        choices=[(tag.name, tag.value) for tag in DisTypes],
        default=DisTypes.PERCENT,
        max_length=7
    )
    discount = models.SmallIntegerField('discount', default=5)
    min_prod = models.SmallIntegerField('minimum number of products required', default=1)
    dis_strategy = models.CharField(
        'discount strategy',
        choices=[(tag.name, tag.value) for tag in DisStrategies],
        default=DisStrategies.DEFA,
        max_length=4
    )
    dis_strategy_split = models.CharField(
        'Spliting strategy for BMDR (2, 5)',
        max_length=8,
        null=True,
        blank=True,
        validators=[validate_comma_separated_integer_list]
    )
    limit = models.IntegerField('limit use of coupon code or -1 for unlimited', default=-1)
    crt_date = models.DateTimeField('created date', default=timezone.now)
    exp_date = models.DateTimeField('expiring date', default=timezone.now() + timezone.timedelta(days=15))

    def __str__(self):
        return "{}".format(self.cp_code)

    class Meta:
        ordering = ('crt_date', 'discount')
        verbose_name = "coupon"

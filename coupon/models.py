from django.core.validators import validate_comma_separated_integer_list
from django.db import models
from enum import IntEnum
from django.utils import timezone


class DisTypes(IntEnum):
    PERCENT = 0
    CASH = 1


class DisStrategies(IntEnum):
    BOGO = 0  # buy one get one
    BMDR = 1  # buy multiple get discount on rest
    DEFA = 2  # apply discount to everything"


class Coupon(models.Model):
    cp_code = models.CharField('coupon code', max_length=15)
    dis_type = models.SmallIntegerField(
        'discount type',
        choices=[(tag, tag.value) for tag in DisTypes],
        default=DisTypes.PERCENT
    )
    discount = models.SmallIntegerField('discount', default=5)
    min_prod = models.SmallIntegerField('minimum number of products required', default=1)
    dis_strategy = models.SmallIntegerField(
        'discount strategy',
        choices=[(tag, tag.value) for tag in DisStrategies],
        default=DisStrategies.DEFA
    )
    dis_strategy_split = models.CharField(
        'Spliting strategy for BMDR (2, 5)',
        max_length=8,
        null=True,
        validators=[validate_comma_separated_integer_list]
    )
    limit = models.IntegerField('limit use of coupon code or -1 for unlimited', default=-1)
    crt_date = models.DateTimeField('created date', default=timezone.now)
    exp_date = models.DateTimeField('expiring date', default=timezone.now() + timezone.timedelta(days=15))

    def __str__(self):
        return "{} with {} and expires {}".format(self.cp_code, self.crt_date, self.exp_date)

    class Meta:
        ordering = ('crt_date', 'discount')

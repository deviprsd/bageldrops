from django.core.validators import validate_comma_separated_integer_list
from core.models import CoreModel, models
from enum import Enum
from django.utils import timezone


def expiry_date():
    return timezone.now() + timezone.timedelta(days=15)


class DisTypes(Enum):
    PERCENT = "Pecentage based discount"
    CASH = "Cash based discount"


class DisStrategies(Enum):
    BOGO = "Buy one Get one"  # buy one get one
    BMDR = "Buy multiple Get Discount on Rest"  # buy multiple get discount on rest
    DEFA = "Apply Discount to Everything"  # apply discount to everything


class Coupon(CoreModel):
    cp_code = models.CharField('coupon code', max_length=15)
    dis_type = models.CharField(
        'discount type',
        choices=[(tag.name, tag.value) for tag in DisTypes],
        default=DisTypes.PERCENT.name,
        max_length=7
    )
    discount = models.SmallIntegerField('discount', default=5)
    min_prod = models.SmallIntegerField('minimum number of products required', default=1)
    dis_strategy = models.CharField(
        'discount strategy',
        choices=[(tag.name, tag.value) for tag in DisStrategies],
        default=DisStrategies.DEFA.name,
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
    exp_date = models.DateTimeField('expiring date', default=expiry_date)

    def __str__(self):
        return "{}".format(self.cp_code)

    class Meta:
        ordering = ('exp_date', 'cp_code')
        verbose_name = "coupon"

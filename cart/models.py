from core.models import models, CoreModel
from enum import Enum
from billing.models import Billing
from product.models import Product


class CartState(Enum):
    COMPLETED = "Completed transaction"
    IN_PROGRESS = "Transaction in progress"


class Cart(CoreModel):
    cart_state = models.CharField(
        'Cart State',
        choices=[(x.name, x.value) for x in CartState],
        default=CartState.IN_PROGRESS,
        max_length=11
    )
    cart_billing = models.OneToOneField(
        Billing,
        on_delete=models.CASCADE,
        primary_key=True,
        null=True,
    )
    products = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    def __str__(self):
        return "{}".format(self.id)

    class Meta:
        ordering = ('cart_billing', 'cart_state')
        verbose_name = "cart"

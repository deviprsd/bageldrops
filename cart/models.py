from core.models import models, CoreModel
from enum import Enum
from billing.models import Billing
from customer.models import Customer
from product.models import Product


# enum for cart state
class CartState(Enum):
    COMPLETED = "Completed transaction"
    IN_PROGRESS = "Transaction in progress"


# creates cart model with fields cart state, cart billing, and products
# cart billing is inherited from billing model
# products is inherited from product model
class Cart(CoreModel):
    cart_state = models.CharField(
        'Cart State',
        choices=[(x.name, x.value) for x in CartState],
        default=CartState.IN_PROGRESS.name,
        max_length=11
    )
    cart_billing = models.OneToOneField(
        Billing,
        on_delete=models.CASCADE,
        primary_key=True,
        default=None,
    )
    products = models.ManyToManyField(
        Product,
        related_name='carts'
    )
    cart_id = models.CharField('ID', max_length=10, default="")
    subtotal = models.FloatField('Subtotal', default=0.0)
    total = models.FloatField('Total', default=0.0)
    customer = models.ForeignKey(
        Customer,
        on_delete=models.SET_NULL,
        related_name='carts',
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.cart_id}'

    class Meta:
        ordering = ('cart_billing', 'cart_state')
        verbose_name = "cart"

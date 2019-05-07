import uuid
from core.models import models, CoreModel
from billing.models import Billing
from cart.models import Cart
from django.contrib.auth.models import User


class Customer(CoreModel):
    customer_id = models.CharField('Customer ID', max_length=36, default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer', null=True)
    billing_info = models.ForeignKey(
        Billing,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    carts = models.ForeignKey(
        Cart,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.customer_id}'

    class Meta:
        ordering = ('customer_id',)
        verbose_name = 'customer'





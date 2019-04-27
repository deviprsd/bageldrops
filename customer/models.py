from django.core.validators import validate_email
from core.models import models, CoreModel
from billing.models import Billing
from cart.models import Cart


class Customer(CoreModel):
    customer_id = models.IntegerField('Customer ID', default=0)
    email = models.CharField('Email', max_length=50, validators=[validate_email])
    password = models.CharField('Password', max_length=50)
    name = models.CharField('Name', max_length=50)
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
        ordering = ('email', 'password')
        verbose_name = 'customer'





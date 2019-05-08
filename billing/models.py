from core.models import models, CoreModel
from address.models import Address
from customer.models import Customer


# creates billing model
# has fields billing address, delivery address, card number, card security code,
# and card expiration date
class Billing(CoreModel):
    billing_address = models.OneToOneField(Address, on_delete=models.CASCADE, related_name='%(class)s_billing')
    delivery_address = models.OneToOneField(Address, on_delete=models.CASCADE, related_name='%(class)s_delivery')
    card_number = models.CharField('Card Number', max_length=16)
    card_security_code = models.CharField('Card Security Code', max_length=16)
    card_exp_date = models.CharField('Card Expiration Date', max_length=10)
    customer = models.ForeignKey(
        Customer,
        on_delete=models.SET_NULL,
        related_name='billing',
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.card_number}'

    class Meta:
        ordering = ['card_number']
        verbose_name = 'billing'

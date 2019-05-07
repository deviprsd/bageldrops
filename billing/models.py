from core.models import models, CoreModel
from address.models import Address


# creates billing model
# has fields billing address, delivery address, card number, card security code,
# card expiration date
class Billing(CoreModel):
    billing_address = models.OneToOneField(Address, on_delete=models.CASCADE, related_name='%(class)s_billing')
    delivery_address = models.OneToOneField(Address, on_delete=models.CASCADE, related_name='%(class)s_delivery')
    tax_state = models.CharField('Tax State', max_length=8, default="WI")
    tax_rate = models.FloatField('Tax Rate', default=0.05)
    card_number = models.BigIntegerField('Card Number')
    card_security_code = models.SmallIntegerField('Card Security Code')
    card_exp_date = models.CharField('Card Expiration Date', max_length=10)

    def __str__(self):
        return f'{self.card_number}'

    class Meta:
        ordering = ['card_number']
        verbose_name = 'billing'

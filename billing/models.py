from core.models import models, CoreModel


class Billing(CoreModel):
    billing_address = models.CharField('Billing Address', max_length=100)
    delivery_address = models.CharField('Delivery Address', max_length=100, default='...')
    card_number = models.BigIntegerField('Card Number')
    card_security_code = models.SmallIntegerField('Card Security Code')
    card_exp_data = models.CharField('Card Expiration Date', max_length=10)

    def __str__(self):
        return "{}".format(self.card_number)

    class Meta:
        ordering = ['card_number']
        verbose_name = "billing"

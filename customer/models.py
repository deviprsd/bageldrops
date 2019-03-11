from core.models import models, CoreModel


class Customer(CoreModel):
    email = models.CharField('Email', max_length=50)
    password = models.CharField('Password', max_length=50)
    name = models.CharField('Name', max_length=50)
    delivery_address = models.CharField('Address', max_length=50)
    billing_address = models.CharField('Billing address', max_length=50)
    card_number = models.IntegerField('card number')
    card_exp_date = models.CharField('card expiration date', max_length=10)
    sec_code = models.IntegerField('card security code')

    def __str__(self):
        return "{}".formate(self.email)

    class Meta:
        ordering = ('email', 'password')
        verbose_name = 'customer'




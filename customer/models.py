import uuid
from core.models import models, CoreModel
from django.contrib.auth.models import User


# creates customer model with fields customer id
# inherits user from User model
# inherits billing info from Billing model
# inherits carts from Cart model
class Customer(CoreModel):
    customer_id = models.CharField('Customer ID', max_length=36, default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer', null=True)

    def __str__(self):
        return f'{self.user.username} - {self.customer_id}'

    class Meta:
        ordering = ('customer_id',)
        verbose_name = 'customer'





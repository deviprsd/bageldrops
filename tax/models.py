
from core.models import models, CoreModel


# creates tax model with field tax rate
class Tax(CoreModel):
    state = models.CharField('State', max_length=2, default='WI', unique=False)
    tax_rate = models.FloatField('Tax Rate', default=0.5, unique=False)

    def __str__(self):
        return f'{self.state} - {self.tax_rate}'


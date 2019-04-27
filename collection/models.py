from core.models import models, CoreModel
from product.models import Product


class Collection(CoreModel):
    category = models.CharField('Category', max_length=50)
    is_active = models.BooleanField('Active status')
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f'{self.category}'

    class Meta:
        ordering = ('category',)

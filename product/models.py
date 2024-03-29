from enum import Enum
from core.models import models, CoreModel
import uuid


# product categories class
class ProdCategories(Enum):
    CLOTHING = "Clothing/ Shoes/ Accessories"
    MEDIA = "Books/ Movies/ TV Shows/ Music"
    ELECTRONICS = "Electronic Devices/ Accessories"
    MISC = "Misc"


# creates product model with fields product name, price, unique product id, product category, stock,
# and purchase limit
class Product(CoreModel):
    prod_name = models.CharField('product name', max_length=50)
    price = models.FloatField('price', default=0.00)
    prod_id = models.CharField('product ID', max_length=36, default=uuid.uuid4, unique=True)
    prod_category = models.CharField(
        'product category',
        choices=[(x.name, x.value) for x in ProdCategories],
        default=ProdCategories.MISC.name,
        max_length=11
    )
    stock = models.IntegerField('number of product in stock', default=1)
    limit = models.IntegerField('max number of product per order')
    images = models.ImageField('Product Images', upload_to='products', default='products/no_prod_image.jpg')

    def __str__(self):
        return f'{self.prod_name}'

    class Meta:
        ordering = ('prod_name', 'prod_id')
        verbose_name = "product"

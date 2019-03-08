from django.db import models


class CoreModel(models.Model):
    crt_date = models.DateTimeField('created date', auto_now_add=True)
    mdf_date = models.DateTimeField('modified date', auto_now=True)

    class Meta:
        abstract = True

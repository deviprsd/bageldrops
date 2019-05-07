from django.contrib.auth.models import User, Group
from customer.models import Customer


def add_user_relations(sender, instance, created, **kwargs):
    try:
        if created:
            instance.groups.add(Group.objects.get(name='Customers'))
            customer = Customer(user=instance)
            customer.save()
    except Group.DoesNotExist:
        pass

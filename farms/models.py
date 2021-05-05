from accounts.models import User
from djmoney.models.fields import MoneyField
from datetime import timedelta
from django.db import models

# Create your models here.

class Farm(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True,blank=True)
    user = models.ForeignKey(
                            User,
                            null=False,
                            blank=False,
                            related_name="user",
                            on_delete=models.CASCADE
                            )

    def __unicode__(self):
    	return self.user.username

class Subscription(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True,blank=True)
    minimum_duration = models.DurationField(default=timedelta(days=30))
    subscription_cost = MoneyField(
                                max_digits=14,
                                decimal_places=2,
                                default_currency='INR'
                            )
    farm = models.ForeignKey(
                            Farm,
                            related_name='farm',
                            on_delete=models.CASCADE
                            )
    def __unicode__(self):
    	return self.name

class SubscriptionPicture(models.Model):
    subscription = models.ForeignKey(
                            Subscription,
                            related_name='subscription',
                            on_delete=models.CASCADE
                            )
    image = models.ImageField(default='default.jpg', upload_to='farm_media')
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return f'{self.farm.name} SubscriptionPicture'

class FarmPicture(models.Model):
    farm = models.ForeignKey(
                            Farm,
                            on_delete=models.CASCADE
                            )
    image = models.ImageField(default='default.jpg', upload_to='farm_media')
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return f'{self.farm.name} FarmPicture'

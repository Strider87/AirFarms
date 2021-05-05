from django import forms
from .models import Farm, Subscription

class NewFarm(forms.ModelForm):
    class Meta:
        model = Farm
        field = ['name', 'description', 'user']

class NewSubscription(forms.ModelForm):
    class Meta:
        model = Subscription
        field = [
            'name',
            'description',
            'minimum_duration',
            'subscription_cost',
        ]

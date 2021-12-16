from django.contrib import admin
from .models import (
            Farm,
            Subscription,
            SubscriptionPicture,
            FarmPicture,
            FarmFollowers,
            FarmProfilePicture
            )

admin.site.register(Farm)
admin.site.register(Subscription)
admin.site.register(SubscriptionPicture)
admin.site.register(FarmPicture)
admin.site.register(FarmFollowers)
admin.site.register(FarmProfilePicture)

from .models import FarmMap
from rest_framework import serializers

class FarmMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmMap
        fields = ('__all__')
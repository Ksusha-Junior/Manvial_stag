from rest_framework import serializers
from .models import Service, Price, Discount


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'service']


class PriceSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.service', read_only=True)

    class Meta:
        model = Price
        fields = ['id', 'service', 'base_price', 'service_name']

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'min_objects', 'discount_percent']
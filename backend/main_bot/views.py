from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ServiceSerializer, PriceSerializer
from rest_framework import serializers, viewsets, filters
from .models import Service, Price


class CalculatePriceView(APIView):
    def get(self, request):
        service_id = request.query_params.get('service_id')
        quantity_str = request.query_params.get('quantity', 1)
        quantity_str = quantity_str.replace(',', '.')
        quantity = float(quantity_str)

        try:
            price = Price.objects.get(id=service_id)
            total_price = price.calculate_price(quantity)

            return Response({
                'service': price.service.service,
                'quantity': quantity,
                'base_price': price.base_price,
                'total_price': total_price
            })
        except Price.DoesNotExist:
            return Response({'error': 'Услуга не найдена'}, status=404)
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    # permission_classes = [AllowAny]
    http_method_names = ['get']


class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    filterset_fields = ['service']
    # permission_classes = [AllowAny]
    http_method_names = ['get']

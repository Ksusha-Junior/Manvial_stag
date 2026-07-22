from django.urls import path
from .views import CalculatePriceView, ServiceViewSet, PriceViewSet
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'service', ServiceViewSet, 'service')
router.register(r'price', PriceViewSet, 'price')

urlpatterns = router.urls +[
    path('calculate_price/', CalculatePriceView.as_view(), name='calculate_price'),
]
from django.db import models

class Service(models.Model):
    service = models.CharField(verbose_name='услуга')


    def __str__(self):
        return self.service

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'


class Discount(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='услуга')
    min_objects = models.FloatField(verbose_name='минимальное количество объектов')
    discount_percent = models.IntegerField(verbose_name='процент скидки')

    def __str__(self):
        return f'Скидка {self.discount_percent}% для {self.service.service} от {self.min_objects} объектов'

    class Meta:
        verbose_name = 'Скидка'
        verbose_name_plural = 'Скидки'
        unique_together = ('service', 'min_objects')


class Price(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='услуга')
    base_price = models.IntegerField(verbose_name='базовая цена')
    
    def calculate_price(self, quantity):
        """Рассчитывает итоговую цену с учетом скидок"""
        total = self.base_price * quantity

        # Получаем подходящую скидку для данной услуги и количества
        discount = Discount.objects.filter(
            service=self.service,
            min_objects__lte=quantity
        ).order_by('-min_objects').first()
            
        if discount:
            total = total * (1 - discount.discount_percent / 100)

        return round(total)

    def __str__(self):
        return f'{self.service} - {self.base_price}'

    class Meta:
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'




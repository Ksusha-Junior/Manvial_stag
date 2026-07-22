from django.db import models

class Post(models.Model):
    title = models.CharField(verbose_name='заголовок', blank=True )
    image = models.ImageField(verbose_name='Картинка', upload_to='images', null=True, blank=True)
    text = models.TextField(verbose_name='Текст')

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

class Personal_info (models.Model):
    image = models.ImageField(verbose_name='Картинка', upload_to='images', null=True, blank=True)
    text = models.TextField(verbose_name='Текст')

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Обо мне'
        verbose_name_plural = 'Обо мне'


class Comment(models.Model):
    date = models.DateField(auto_now=True, verbose_name='Дата')
    name = models.CharField(max_length=30, blank=True, null=True, default='user', verbose_name='Имя')
    text = models.TextField(max_length=200, verbose_name='текст')

    def __str__(self):
        return f'{self.id}, {self.date}, {self.name}, {self.text}'

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        ordering = ['date']

class Photo(models.Model):
    comment = models.ForeignKey(Comment, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='comments/photos/')

    def __str__(self):
        return f'{self.comment}, {self.image}'

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фото'
        ordering = ['comment']

class Video(models.Model):
    comment = models.ForeignKey(Comment, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='comments/videos/')

    def __str__(self):
        return f'{self.comment}, {self.video}'

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        ordering = ['comment']

class Organizations(models.Model):
    text = models.TextField(verbose_name='текст')


    def __str__(self):
        return f'{self.text}'

    class Meta:
        verbose_name = 'Юр.лица'
        verbose_name_plural = 'Юр.лица'

class OrganizationPhoto(models.Model):
    organization = models.ForeignKey(Organizations, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(verbose_name='Фото', upload_to='organization_photos')

    def __str__(self):
        return f'{self.organization}, {self.image}'

    class Meta:
        verbose_name = 'Юр.лица фото'
        verbose_name_plural = 'Юр.лица фото'


class People(models.Model):
    text = models.TextField(verbose_name='текст')
    image = models.ImageField(verbose_name='Картинка', upload_to='images', null=True, blank=True)

    def __str__(self):
        return f'{self.text}, {self.image}'

    class Meta:
        verbose_name = 'Физ.лица'
        verbose_name_plural = 'Физ.лица'

class Interesting(models.Model):
    title = models.CharField(verbose_name='заголовок', blank=True )
    image = models.ImageField(verbose_name='Картинка', upload_to='images', null=True, blank=True)
    text = models.TextField(verbose_name='Текст')

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'
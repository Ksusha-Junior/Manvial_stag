from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


# class CustomUser(AbstractUser):
#     username = models.TextField(max_length=50)
#     bio = models.TextField(max_length=500, blank=True)
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
#     phone_number = models.CharField(max_length=15, blank=True)
#
#     def __str__(self):
#         return self.username


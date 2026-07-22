from django.contrib import admin
from main_bot.models import Service, Discount, Price
from .models import Post
from .models import Personal_info,Organizations,People
from .models import Comment, Photo, Video, OrganizationPhoto, Interesting

admin.site.register(Service)
admin.site.register(Discount)
admin.site.register(Price)
admin.site.register(Post)
admin.site.register(Personal_info)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(Video)
admin.site.register(Organizations)
admin.site.register(People)
admin.site.register(OrganizationPhoto)
admin.site.register(Interesting)